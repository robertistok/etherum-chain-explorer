import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "@aragon/ui";

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

      {block === null && (
        <div>
          <p>Block not mined yet...</p>
          <p>
            <strong>{numberParsed - latestBlockNumber}</strong> blocks in front
            of it
          </p>
        </div>
      )}

      {block && (
        <BlockInfo>
          <BlockInfoRow>
            <Text>Block height</Text>
            <Text>{block.number}</Text>
          </BlockInfoRow>

          <BlockInfoRow>
            <Text>Timestamp</Text>
            <Text>{block.timestamp}</Text>
          </BlockInfoRow>
        </BlockInfo>
      )}
    </Root>
  );
};

const Root = styled.section``;

const BlockInfo = styled.div`
  max-width: 50%;
`;

const BlockInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Block;
