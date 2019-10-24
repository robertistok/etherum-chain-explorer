import React from "react";
import styled from "styled-components";
import { CircleGraph } from "@aragon/ui";

const GraphData = ({ block = {} }) => {
  const { transactions = [] } = block;
  const transactionsSendingEther = transactions.filter(t => t.value > 0);
  const transactionsSendingEtherPercentage = transactions.length
    ? transactionsSendingEther.length / transactions.length
    : 0;
  const gasUsedPercentage = block ? block.gasUsed / block.gasLimit : 0;

  return (
    <Root>
      <CircleGraphWithLabel>
        <CircleGraph size={120} value={gasUsedPercentage} />
        <CircleGraphLabel>Gas used</CircleGraphLabel>
      </CircleGraphWithLabel>
      <CircleGraphWithLabel>
        <CircleGraph size={120} value={transactionsSendingEtherPercentage} />
        <CircleGraphLabel>Transactions sending Ether</CircleGraphLabel>
      </CircleGraphWithLabel>
    </Root>
  );
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
