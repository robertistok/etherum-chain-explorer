import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { Button } from "@aragon/ui";

import Block from "./Block";
import promisify from "../../utils/promisify";
import { useLatestBlocksStateValue } from "../../state/latestBlocks";
import { useDataApi } from "../../hooks";

const BlockPage = ({ number }) => {
  const numberParsed = Number(number);
  const getBlock = useCallback(
    () => promisify(cb => window.web3.eth.getBlock(number, cb)),
    [number]
  );

  const { latestBlocks, storeBlock, findBlock } = useLatestBlocksStateValue();
  const [{ data, isLoading }, fetchBlock] = useDataApi({
    dataFetcher: getBlock
  });
  const [block, setBlock] = useState();

  useEffect(() => {
    storeBlock(data);
    setBlock(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    if (!block && !isLoading) {
      fetchBlock();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchBlock]);
  useEffect(() => {
    const alreadyFetchedBlock = findBlock(numberParsed);

    setBlock(alreadyFetchedBlock);
  }, [findBlock, latestBlocks, numberParsed]);

  return (
    <Root>
      <NavigationContainer>
        <Link to={`/block/${numberParsed - 1}`}>
          <Button mode="secondary">Previous block</Button>
        </Link>
        <Link to="/">
          <Button mode="strong">Home</Button>
        </Link>
        <Link to={`/block/${numberParsed + 1}`}>
          <Button mode="secondary">Next block</Button>
        </Link>
      </NavigationContainer>

      <Block block={block} isLoading={isLoading} number={numberParsed} />
    </Root>
  );
};

const Root = styled.section``;

const NavigationContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export default BlockPage;
