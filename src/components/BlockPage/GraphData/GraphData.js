import React from "react";
import styled from "styled-components";
import { CircleGraph } from "@aragon/ui";
import PropTypes from "prop-types";

const GraphData = ({ block = {} }) => {
  const { transactions = [] } = block;
  const transactionsSendingEther = transactions.filter(t => t.value > 0);
  const transactionsSendingEtherPercentage = transactions.length
    ? transactionsSendingEther.length / transactions.length
    : 0;
  const gasUsedPercentage = block.gasUsed / block.gasLimit;

  return (
    <Root>
      <CircleGraphWithLabel
        tabIndex={0}
        aria-label={`${(gasUsedPercentage * 100).toFixed(2)}% gas used`}
      >
        <CircleGraph size={120} value={gasUsedPercentage} />
        <CircleGraphLabel>Gas used</CircleGraphLabel>
      </CircleGraphWithLabel>
      <CircleGraphWithLabel
        tabIndex={0}
        aria-label={`${(transactionsSendingEtherPercentage * 100).toFixed(
          2
        )}% transactions sending ether`}
      >
        <CircleGraph size={120} value={transactionsSendingEtherPercentage} />
        <CircleGraphLabel>Transactions sending Ether</CircleGraphLabel>
      </CircleGraphWithLabel>
    </Root>
  );
};

GraphData.propTypes = {
  block: PropTypes.object
};

const Root = styled.div`
  grid-area: 1 / 3 / 3 / span 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const CircleGraphWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleGraphLabel = styled.span`
  font-size: 12px;
`;

export default GraphData;
