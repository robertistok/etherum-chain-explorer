import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import { Link } from "@reach/router";
import {
  ExternalLink,
  ProgressBar,
  Table,
  TableHeader,
  TableRow,
  TableCell
} from "@aragon/ui";

import { Title } from "../common";

import { getLatestNBlocks } from "../../utils/web3";
import useLatestBlocks from "../../state/latestBlocks";

const LatestBlocks = () => {
  const [{ latestBlocks }] = useLatestBlocks();

  // useEffect(() => {
  //   async function fetchData() {
  //     getLatestNBlocks({
  //       n: 10,
  //       storeBlock: block => setLatestBlocks(prev => [...prev, block])
  //     });
  //   }

  //   fetchData();
  // }, []);

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
        {transitions.map(({ item, props, key }) => {
          const usedGasPercentage = item.gasUsed / item.gasLimit;

          return (
            <StyledAnimatedTableRow style={props} key={key}>
              <TableCell>
                <Link to={`/block/${item.number}`}>{item.number}</Link>
              </TableCell>
              <TableCell>{item.timestamp}</TableCell>
              <TableCell>{item.transactions.length}</TableCell>
              <TableCell>
                <ExternalLink
                  href={`https://etherscan.io/address/${item.miner}`}
                >
                  {item.miner.slice(2, 7)}...
                </ExternalLink>
              </TableCell>
              <TableCell>
                <ProgressBar value={usedGasPercentage} title="test" />
              </TableCell>
            </StyledAnimatedTableRow>
          );
        })}
      </Table>
    </Root>
  );
};

const Root = styled.section``;

const StyledAnimatedTableRow = styled(animated(TableRow))`
  &:hover {
    transform: scale(1.01) !important;
    cursor: pointer;
  }
`;

export default LatestBlocks;
