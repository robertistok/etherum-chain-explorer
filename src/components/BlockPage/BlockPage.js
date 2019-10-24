import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { Button, Card } from "@aragon/ui";
import PropTypes from "prop-types";

import Block from "./Block";
import Transactions from "./Transactions";
import GraphData from "./GraphData";
import { Title, ItalicText } from "../common";

import promisify from "../../utils/promisify";
import { useLatestBlocksStateValue } from "../../state/latestBlocks";
import { useDataApi } from "../../hooks";

const BlockPage = ({ number }) => {
  const numberParsed = Number(number);

  const {
    storeBlock,
    findBlock,
    latestBlockNumber
  } = useLatestBlocksStateValue();

  const alreadyFetchedBlock = findBlock(numberParsed);
  const [block, setBlock] = useState(alreadyFetchedBlock);

  const getBlock = useCallback(
    () => promisify(cb => window.web3.eth.getBlock(number, true, cb)),
    [number]
  );

  const [{ data, isLoading }] = useDataApi({
    dataFetcher: !alreadyFetchedBlock ? getBlock : null
  });

  useEffect(() => {
    const blockValueToSet = alreadyFetchedBlock || data;
    if (data && !alreadyFetchedBlock) {
      storeBlock(data);
    }
    setBlock(blockValueToSet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, alreadyFetchedBlock]);

  return (
    <Root>
      <NavigationContainer>
        <Link to="/" style={{ marginRight: "auto" }}>
          <Button mode="strong">Home</Button>
        </Link>

        <Link to={`/block/${numberParsed - 1}`}>
          <Button mode="secondary">Previous block</Button>
        </Link>
        <Link to={`/block/${numberParsed + 1}`}>
          <Button mode="secondary">Next block</Button>
        </Link>
      </NavigationContainer>

      <StyledTitle tabIndex="0" aria-label={`Block number ${number}`}>
        Block #<ItalicText>{number}</ItalicText>
      </StyledTitle>

      {isLoading ? (
        <span aria-label="Loading" tabIndex="0">
          Loading...
        </span>
      ) : (
        <>
          {!block && number > latestBlockNumber && (
            <>
              <p aria-label="Block not mined yet" tabIndex="0">
                Block not mined yet...
              </p>
              <p>
                <strong>{number - latestBlockNumber}</strong> more block(s) in
                front of it
              </p>
            </>
          )}
          {block && (
            <InfoContainer>
              <Block block={block} number={numberParsed} />
              <GraphData block={block} />
              <Transactions transactions={block.transactions} />
            </InfoContainer>
          )}
        </>
      )}
    </Root>
  );
};

BlockPage.propTypes = {
  number: PropTypes.string
};

const Root = styled.section``;

const NavigationContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  a {
    margin-right: 10px;

    &:last-of-type {
      margin-right: 0px;
    }
  }
`;

const StyledTitle = styled(Title)`
  margin-bottom: 10px;
`;

const InfoContainer = styled(Card)`
  width: 100%;
  min-height: 500px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 200px);
  grid-gap: 10px;
`;

export default BlockPage;
