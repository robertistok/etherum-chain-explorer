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
  const timestampFormatted = moment.unix(block.timestamp).fromNow();

  return (
    <Root>
      <Title aria-label="Block info" tabIndex="0">
        Info
      </Title>
      <BlockInfo>
        <BlockInfoRow aria-label={`Block height, ${block.number}`} tabIndex="0">
          <BlockInfoLabel>Block height</BlockInfoLabel>
          <Text>{block.number}</Text>
        </BlockInfoRow>

        <BlockInfoRow
          aria-label={`Timestamp, ${timestampFormatted}`}
          tabIndex="0"
        >
          <BlockInfoLabel>Timestamp</BlockInfoLabel>
          <Text>{timestampFormatted}</Text>
        </BlockInfoRow>

        <BlockInfoRow
          aria-label={`Transactions count, ${block.transactions.length}`}
          tabIndex="0"
        >
          <BlockInfoLabel>Transactions count</BlockInfoLabel>
          <Text>{block.transactions.length}</Text>
        </BlockInfoRow>

        <BlockInfoRow aria-label={`Gas limit, ${block.gasLimit}`} tabIndex="0">
          <BlockInfoLabel>Gas limit</BlockInfoLabel>
          <Text>{block.gasLimit}</Text>
        </BlockInfoRow>

        <BlockInfoRow aria-label="Miner" tabIndex="0">
          <BlockInfoLabel>Miner</BlockInfoLabel>
          <ExternalLink
            aria-label="External link, visit miner"
            href={`https://etherscan.io/address/${block.miner}`}
          >
            {formatHash(block.miner)}
          </ExternalLink>
        </BlockInfoRow>

        <BlockInfoRow
          aria-label={`Value, ${blockValue} Ether (~${getEtherValueInUSD(
            blockValue
          )}$)`}
          tabIndex="0"
        >
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
