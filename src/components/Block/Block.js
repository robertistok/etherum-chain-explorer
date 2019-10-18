import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "@aragon/ui";

import { Title } from "../common";

import promisify from "../../utils/promisify";

const Block = ({ number }) => {
  const [block, setBlock] = useState(undefined);
  useEffect(() => {
    async function fetchData() {
      const response = await promisify(cb =>
        window.web3.eth.getBlock(number, cb)
      );
      setBlock(response);
    }

    fetchData();
  }, [number]);

  return (
    <Root>
      <Title>Block #{number}</Title>

      {block === null && <span>Block not mined yet...</span>}

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
