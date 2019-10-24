import React from "react";
import styled from "styled-components";
import { AddressField, SidePanel, TransactionBadge, Text } from "@aragon/ui";
import PropTypes from "prop-types";

import { ItalicText } from "../../../common";
import { getEtherValueInUSD } from "../../../../utils/web3";

const TransactionSidePanel = ({ opened, transaction, handleClose }) => {
  let gasPriceInEther, valueInEther;

  if (transaction) {
    gasPriceInEther = window.web3.utils.fromWei(transaction.gasPrice);
    valueInEther = window.web3.utils.fromWei(transaction.value);
  }

  return (
    <SidePanel title={`Transaction info`} opened={opened} onClose={handleClose}>
      {transaction ? (
        <>
          <TransactionInfoRow aria-label="Hash" tabIndex="0">
            <TransactionInfoLabel>Hash</TransactionInfoLabel>
            <TransactionBadge shorten={false} transaction={transaction.hash} />
          </TransactionInfoRow>

          <TransactionInfoRow
            tabIndex="0"
            aria-label={`Index, ${transaction.transactionIndex}`}
          >
            <TransactionInfoLabel>Index</TransactionInfoLabel>
            <Text>{transaction.transactionIndex}</Text>
          </TransactionInfoRow>

          <TransactionInfoRow tabIndex="0" aria-label="From address">
            <TransactionInfoLabel>From</TransactionInfoLabel>
            <AddressField address={transaction.from} />
          </TransactionInfoRow>

          <TransactionInfoRow tabIndex="0" aria-label="To address">
            <TransactionInfoLabel>To</TransactionInfoLabel>
            <AddressField address={transaction.to} />
          </TransactionInfoRow>

          <TransactionInfoRow
            tabIndex="0"
            aria-label={`Value, ${valueInEther} Ether (~${getEtherValueInUSD(
              valueInEther
            )}$)`}
          >
            <TransactionInfoLabel>Value</TransactionInfoLabel>
            <Text>
              {valueInEther} Ether (~{getEtherValueInUSD(valueInEther)}$)
            </Text>
          </TransactionInfoRow>

          <TransactionInfoRow
            tabIndex="0"
            aria-label={`Gas provided by the sender, ${transaction.gas}`}
          >
            <TransactionInfoLabel>
              Gas provided by the sender
            </TransactionInfoLabel>
            <Text>{transaction.gas}</Text>
          </TransactionInfoRow>

          <TransactionInfoRow
            tabIndex="0"
            aria-label={`Gas price, ${gasPriceInEther} Ether`}
          >
            <TransactionInfoLabel>Gas price</TransactionInfoLabel>
            <Text>{gasPriceInEther} Ether</Text>
          </TransactionInfoRow>
        </>
      ) : null}
    </SidePanel>
  );
};

TransactionSidePanel.propTypes = {
  opened: PropTypes.bool.isRequired,
  transaction: PropTypes.object,
  handleClose: PropTypes.func.isRequired
};

const TransactionInfoRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const TransactionInfoLabel = styled(ItalicText)`
  text-decoration: underline;
`;

export default TransactionSidePanel;
