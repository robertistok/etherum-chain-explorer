import React from "react";
import styled from "styled-components";
import { useTransition } from "react-spring";

import { Table, TableHeader, TableRow } from "@aragon/ui";

import { Title } from "../common";
import BlockRow from "./BlockRow";

import useLatestBlocks from "../../state/latestBlocks";

const LatestBlocks = () => {
  const [{ latestBlocks }] = useLatestBlocks();

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
      <Table
        header={
          <TableRow>
            <TableHeader title="Block" />
            <TableHeader title="Age" />
            <TableHeader title="Txn" />
            <TableHeader title="Miner" />
            <TableHeader title="Gas used" />
          </TableRow>
        }
      >
        {transitions.map(({ item, props: animationProps, key }) => (
          <BlockRow key={key} animationProps={animationProps} {...item} />
        ))}
      </Table>
    </Root>
  );
};

const Root = styled.section``;

export default LatestBlocks;
