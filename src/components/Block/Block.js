import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { Button, Text } from "@aragon/ui";
import moment from "moment";

import { Title } from "../common";

import promisify from "../../utils/promisify";
import { useLatestBlocksStateValue } from "../../state/latestBlocks";

const Block = ({ number }) => {
  const numberParsed = Number(number);
  const [block, setBlock] = useState(undefined);
  const { latestBlockNumber, latestBlocks } = useLatestBlocksStateValue();

  useEffect(() => {
    async function fetchData() {
      const response = await promisify(cb =>
        window.web3.eth.getBlock(number, cb)
      );
      setBlock(response);
    }

    const alreadyFetchedBlock = latestBlocks.find(
      b => b && b.number === numberParsed
    );

    if (alreadyFetchedBlock) {
      setBlock(alreadyFetchedBlock);
    } else {
      fetchData();
    }
  }, [latestBlocks, number, numberParsed]);

  return (
    <Root>
      <Title>Block #{number}</Title>

      <BlockInfo>
        {block === null && (
          <>
            <p>Block not mined yet...</p>
            <p>
              <strong>{numberParsed - latestBlockNumber}</strong> block(s) in
              front of it
            </p>
          </>
        )}
        {block && (
          <>
            <BlockInfoRow>
              <Text>Block height</Text>
              <Text>{block.number}</Text>
            </BlockInfoRow>

            <BlockInfoRow>
              <Text>Timestamp</Text>
              <Text>{moment.unix(block.timestamp).fromNow()}</Text>
            </BlockInfoRow>
          </>
        )}
      </BlockInfo>

      <NavigationContainer>
        <Link to={`/block/${numberParsed - 1}`}>
          <Button>Previous block</Button>
        </Link>
        <Link to={`/block/${numberParsed + 1}`}>
          <Button>Next block</Button>
        </Link>
      </NavigationContainer>
    </Root>
  );
};

const Root = styled.section``;

const BlockInfo = styled.div`
  max-width: 50%;
  margin: 30px 0px;
`;

const BlockInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavigationContainer = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export default Block;
