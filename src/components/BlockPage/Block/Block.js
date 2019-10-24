import React from "react";
import styled from "styled-components";
import { ExternalLink, Text } from "@aragon/ui";
import moment from "moment";
import PropTypes from "prop-types";

import { ItalicText, Title } from "../../common";
import {
  formatHash,
  getEtherValueOfBlock,
  getEtherValueInUSD
} from "../../../utils/web3";

const Block = ({ number, block }) => {
  const blockValue = getEtherValueOfBlock(block);

  return (
    <Root>
      <Title>Info</Title>
      <BlockInfo>
        <BlockInfoRow>
          <BlockInfoLabel>Block height</BlockInfoLabel>
          <Text>{block.number}</Text>
        </BlockInfoRow>

        <BlockInfoRow>
          <BlockInfoLabel>Timestamp</BlockInfoLabel>
          <Text>{moment.unix(block.timestamp).fromNow()}</Text>
        </BlockInfoRow>

        <BlockInfoRow>
          <BlockInfoLabel>Gas limit</BlockInfoLabel>
          <Text>{block.gasLimit}</Text>
        </BlockInfoRow>

        <BlockInfoRow>
          <BlockInfoLabel>Miner</BlockInfoLabel>
          <ExternalLink href={`https://etherscan.io/address/${block.miner}`}>
            {formatHash(block.miner)}
          </ExternalLink>
        </BlockInfoRow>

        <BlockInfoRow>
          <BlockInfoLabel>Value</BlockInfoLabel>
          <Text>
            {blockValue} Ether (~{getEtherValueInUSD(blockValue)}$)
          </Text>
        </BlockInfoRow>
      </BlockInfo>
    </Root>
  );
};

Block.propTypes = {
  number: PropTypes.number,
  block: PropTypes.object
};

const Root = styled.div`
  grid-area: 1 / 1 / 1 / span 2;
`;

const BlockInfo = styled.div``;

const BlockInfoLabel = styled(ItalicText)`
  text-decoration: underline;
`;

const BlockInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Block;
