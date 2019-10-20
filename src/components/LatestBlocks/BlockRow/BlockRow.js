import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animated } from "react-spring";
import { navigate } from "@reach/router";
import moment from "moment";
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

  const handleRowClick = () => navigate(`/block/${number}`);

  return (
    <StyledAnimatedTableRow style={animationProps} onClick={handleRowClick}>
      <TableCell>{number}</TableCell>
      <TableCell>{moment.unix(timestamp).fromNow()}</TableCell>
      <TableCell>{transactions.length}</TableCell>
      <TableCell>{miner.slice(2, 7)}...</TableCell>
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
