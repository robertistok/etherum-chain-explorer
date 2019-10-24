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
          <TransactionInfoRow>
            <TransactionInfoLabel>Hash</TransactionInfoLabel>
            <TransactionBadge shorten={false} transaction={transaction.hash} />
          </TransactionInfoRow>

          <TransactionInfoRow>
            <TransactionInfoLabel>Index</TransactionInfoLabel>
            <Text>{transaction.transactionIndex}</Text>
          </TransactionInfoRow>

          <TransactionInfoRow>
            <TransactionInfoLabel>From</TransactionInfoLabel>
            <AddressField address={transaction.from} />
          </TransactionInfoRow>

          <TransactionInfoRow>
            <TransactionInfoLabel>To</TransactionInfoLabel>
            <AddressField address={transaction.to} />
          </TransactionInfoRow>

          <TransactionInfoRow>
            <TransactionInfoLabel>Value</TransactionInfoLabel>
            <Text>
              {valueInEther} Ether (~{getEtherValueInUSD(valueInEther)}$)
            </Text>
          </TransactionInfoRow>

          <TransactionInfoRow>
            <TransactionInfoLabel>
              Gas provided by the sender
            </TransactionInfoLabel>
            <Text>{transaction.gas}</Text>
          </TransactionInfoRow>

          <TransactionInfoRow>
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
