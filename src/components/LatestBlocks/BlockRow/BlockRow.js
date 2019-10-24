import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animated } from "react-spring";
import { navigate } from "@reach/router";
import moment from "moment";
import { ProgressBar, TableRow, TableCell } from "@aragon/ui";

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
  const timestampFormatted = moment.unix(timestamp).fromNow();

  const handleRowClick = () => navigate(`/block/${number}`);
  const handleRowKeyUp = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleRowClick();
    }
  };

  return (
    <StyledAnimatedTableRow
      aria-label={`Block number ${number}; mined ${timestampFormatted}`}
      role="button"
      style={animationProps}
      onClick={handleRowClick}
      onKeyUp={handleRowKeyUp}
      tabIndex={0}
    >
      <TableCell style={{ width: "10%" }}>{number}</TableCell>
      <TableCell style={{ width: "35%" }}>{timestampFormatted}</TableCell>
      <TableCell style={{ width: "15%" }}>{transactions.length}</TableCell>
      <TableCell style={{ width: "20%" }}>{miner.slice(2, 7)}...</TableCell>
      <TableCell style={{ width: "20%" }}>
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
  transactions: PropTypes.arrayOf(PropTypes.object)
};

const StyledAnimatedTableRow = styled(animated(TableRow))`
  &:hover {
    transform: scale(1.01) !important;
    cursor: pointer;
  }
`;

export default BlockRow;
