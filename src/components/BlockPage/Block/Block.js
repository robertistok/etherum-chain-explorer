import React from "react";
import styled from "styled-components";
import { Text } from "@aragon/ui";
import moment from "moment";
import PropTypes from "prop-types";

import { ItalicText, Title } from "../../common";
import { useLatestBlocksStateValue } from "../../../state/latestBlocks";

const Block = ({ number, isLoading, block }) => {
  const { latestBlockNumber } = useLatestBlocksStateValue();

  return (
    <Root>
      <Title>Info</Title>
      <>
        {!block && number > latestBlockNumber && (
          <>
            <p>Block not mined yet...</p>
            <p>
              <strong>{number - latestBlockNumber}</strong> more block(s) in
              front of it
            </p>
          </>
        )}
        {block && (
          <BlockInfo>
            <BlockInfoRow>
              <ItalicText>Block height</ItalicText>
              <Text>{block.number}</Text>
            </BlockInfoRow>

            <BlockInfoRow>
              <ItalicText>Timestamp</ItalicText>
              <Text>{moment.unix(block.timestamp).fromNow()}</Text>
            </BlockInfoRow>

            <BlockInfoRow>
              <ItalicText>Gas limit</ItalicText>
              <Text>{block.gasLimit}</Text>
            </BlockInfoRow>

            <BlockInfoRow>
              <ItalicText>Gas used</ItalicText>
              <Text>
                {((block.gasUsed / block.gasLimit) * 100).toFixed(2)}%
              </Text>
            </BlockInfoRow>
          </BlockInfo>
        )}
      </>
    </Root>
  );
};

Block.propTypes = {
  number: PropTypes.number
};

const Root = styled.div`
  grid-area: 1 / 1 / 1 / span 2;
`;

const BlockInfo = styled.div``;

const BlockInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Block;
