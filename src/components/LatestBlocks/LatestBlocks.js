import React from "react";
import styled from "styled-components";
import { useTransition } from "react-spring";

import { Table, TableHeader, TableRow } from "@aragon/ui";

import { Title } from "../common";
import BlockRow from "./BlockRow";

import { useLatestBlocksStateValue } from "../../state/latestBlocks";
import { formatTime } from "../../utils/time";

const LatestBlocks = () => {
  const { latestBlocks, lastUpdated } = useLatestBlocksStateValue();

  const transitions = useTransition(latestBlocks, block => block.hash, {
    from: item => ({
      opacity: 0,
      transform: `translate3d(${item.number % 2 ? "-100%" : "100%"},0,0)`
    }),
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" }
  });

  return (
    <Root>
      <Title>Latest blocks</Title>
      <span>
        <em>{`Last updated: ${
          lastUpdated ? formatTime({ timestamp: lastUpdated }) : "never"
        }`}</em>
      </span>
      <StyledTable
        header={
          <TableRow>
            <TableHeader title="Block" />
            <TableHeader title="Mined" />
            <TableHeader title="Txn" />
            <TableHeader title="Miner" />
            <TableHeader title="Gas used" />
          </TableRow>
        }
      >
        {transitions.map(({ item, props: animationProps, key }) => (
          <BlockRow key={key} animationProps={animationProps} {...item} />
        ))}
      </StyledTable>
    </Root>
  );
};

const Root = styled.section``;

const StyledTable = styled(Table)`
  margin: 20px 0px;
`;

export default LatestBlocks;
