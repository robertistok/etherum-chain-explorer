import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animated } from "react-spring";
import { Link } from "@reach/router";
import { ExternalLink, ProgressBar, TableRow, TableCell } from "@aragon/ui";

const BlockRow = ({
  gasUsed,
  gasLimit,
  number,
  miner,
  timestamp,
  transactions,
  animationProps
}) => {
  const usedGasPercentage = gasUsed / gasLimit;

  return (
    <StyledAnimatedTableRow style={animationProps}>
      <TableCell>
        <Link to={`/block/${number}`}>{number}</Link>
      </TableCell>
      <TableCell>{timestamp}</TableCell>
      <TableCell>{transactions.length}</TableCell>
      <TableCell>
        <ExternalLink href={`https://etherscan.io/address/${miner}`}>
          {miner.slice(2, 7)}...
        </ExternalLink>
      </TableCell>
      <TableCell>
        <ProgressBar value={usedGasPercentage} title="test" />
      </TableCell>
    </StyledAnimatedTableRow>
  );
};

BlockRow.propTypes = {
  gasLimit: PropTypes.number,
  gasUsed: PropTypes.number,
  number: PropTypes.number,
  miner: PropTypes.string,
  timestamp: PropTypes.number,
  transactions: PropTypes.arrayOf(PropTypes.string)
};

const StyledAnimatedTableRow = styled(animated(TableRow))`
  &:hover {
    transform: scale(1.01) !important;
    cursor: pointer;
  }
`;

export default BlockRow;
