import React from "react";
import styled from "styled-components";
import { Card, Text } from "@aragon/ui";
import moment from "moment";
import PropTypes from "prop-types";

import { BoldText, Title } from "../../common";
import { useLatestBlocksStateValue } from "../../../state/latestBlocks";

const Block = ({ number, isLoading, block }) => {
  const { latestBlockNumber } = useLatestBlocksStateValue();

  return (
    <Root>
      <StyledTitle>Block #{number}</StyledTitle>

      {isLoading ? (
        <span>Loading...</span>
      ) : (
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
                <BoldText>Block height</BoldText>
                <Text>{block.number}</Text>
              </BlockInfoRow>

              <BlockInfoRow>
                <BoldText>Timestamp</BoldText>
                <Text>{moment.unix(block.timestamp).fromNow()}</Text>
              </BlockInfoRow>

              <BlockInfoRow>
                <BoldText>Gas limit</BoldText>
                <Text>{block.gasLimit}</Text>
              </BlockInfoRow>

              <BlockInfoRow>
                <BoldText>Gas used</BoldText>
                <Text>
                  {((block.gasUsed / block.gasLimit) * 100).toFixed(2)}%
                </Text>
              </BlockInfoRow>
            </BlockInfo>
          )}
        </>
      )}
    </Root>
  );
};

Block.propTypes = {
  number: PropTypes.number
};

const Root = styled(Card)`
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: 40% auto;
  grid-template-rows: 50px auto;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 20px;
  grid-area: 1 / 1 / 1 / span 2;
`;

const BlockInfo = styled.div``;

const BlockInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Block;
