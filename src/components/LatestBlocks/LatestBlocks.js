import React, { useState } from "react";
import styled from "styled-components";
import { useTransition } from "react-spring";
import nanoid from "nanoid";

import { Table, TableHeader, TableRow } from "@aragon/ui";

import { Title } from "../common";
import BlockRow from "./BlockRow";
import Pagination from "./Pagination";

import { useLatestBlocksStateValue } from "../../state/latestBlocks";
import { formatTime } from "../../utils/time";

const BLOCKS_PER_PAGE = 10;

const LatestBlocks = () => {
  const { latestBlocks, lastUpdated } = useLatestBlocksStateValue();
  const [page, setPage] = useState(1);

  const rowTransitions = useTransition(
    latestBlocks,
    block => (block ? block.hash : nanoid()),
    {
      from: item => ({
        opacity: 0,
        transform: `translate3d(-100%,0,0)`
      }),
      enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
      leave: { opacity: 0, transform: "translate3d(-50%,0,0)" }
    }
  );

  return (
    <Root>
      <Title aria-label="Latest blocks on the Etherum chain" tabIndex="0">
        Latest blocks on the Etherum chain (updated:&nbsp;
        <em>
          {`${lastUpdated ? formatTime({ timestamp: lastUpdated }) : "never"}`}
        </em>
        )
      </Title>

      {rowTransitions.length ? (
        <>
          <Pagination
            items={latestBlocks}
            itemsPerPage={BLOCKS_PER_PAGE}
            page={page}
            setPage={setPage}
          />
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
            {rowTransitions
              .slice((page - 1) * BLOCKS_PER_PAGE, BLOCKS_PER_PAGE * page)
              .map(({ item, props: animationProps, key }) => (
                <BlockRow key={key} animationProps={animationProps} {...item} />
              ))}
          </StyledTable>
        </>
      ) : (
        <span
          aria-label="Please wait a few seconds, the blocks are loading"
          tabIndex="0"
        >
          Please wait a few seconds, the blocks are loading!
        </span>
      )}
    </Root>
  );
};

const Root = styled.section``;

const StyledTable = styled(Table)`
  margin: 20px 0px;
`;

export default LatestBlocks;
