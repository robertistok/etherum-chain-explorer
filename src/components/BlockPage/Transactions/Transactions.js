import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@aragon/ui";
import PropTypes from "prop-types";

import { Title } from "../../common";
import { formatHash } from "../../../utils/web3";
import TransactionSidePanel from "./TransactionSidePanel";

const Transactions = ({ transactions = [] }) => {
  const transactionsSendingEther = transactions.filter(t => t.value > 0);
  const [sidePanelState, setSidePanelState] = useState({
    opened: false,
    transaction: null
  });

  const handleTransactionClick = transaction => () => {
    setSidePanelState({ opened: true, transaction });
  };

  const handleSidePanelClose = () =>
    setSidePanelState({ opened: false, transaction: null });

  return (
    <Root>
      <Title tabIndex="0" aria-label="Transactions sending Ether">
        Transactions sending Ether
      </Title>

      <TransactionHashesContainer>
        {transactionsSendingEther.length ? (
          transactionsSendingEther.map(t => {
            return (
              <TransactionHash
                aria-label="Transaction, expand for more info"
                key={t.hash}
                mode="outline"
                onClick={handleTransactionClick(t)}
              >
                {formatHash(t.hash)}
              </TransactionHash>
            );
          })
        ) : (
          <span>None...</span>
        )}
      </TransactionHashesContainer>

      <TransactionSidePanel
        {...sidePanelState}
        handleClose={handleSidePanelClose}
      />
    </Root>
  );
};

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object)
};

const Root = styled.div`
  grid-area: 2 / 1 / 2 / span 2;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TransactionHashesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 300px;
  overflow: auto;
  justify-content: flex-start;
`;

const TransactionHash = styled(Button)`
  margin: 2px 4px;
  padding: 3px;
  width: 80px;
`;

export default Transactions;
