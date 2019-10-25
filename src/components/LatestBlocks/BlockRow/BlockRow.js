import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animated } from "react-spring";
import { navigate } from "@reach/router";
import moment from "moment";
import { ProgressBar, TableRow, TableCell } from "@aragon/ui";

import { TextPlaceholder } from "../../common";

import { formatHash } from "../../../utils/web3";

const BlockRow = ({
  gasUsed,
  gasLimit,
  number,
  miner,
  timestamp,
  transactions,
  animationProps,
  showPlaceHolder
}) => {
  const usedGasPercentage = gasUsed && gasLimit ? gasUsed / gasLimit : 0;
  const timestampFormatted = moment.unix(timestamp).fromNow();
  const transactionsCount = transactions ? transactions.length : null;
  const minerFormatted = miner ? formatHash(miner) : null;

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
      <TableCell style={{ width: "10%" }}>
        <TextPlaceholder ready={!showPlaceHolder}>
          <span>{number}</span>
        </TextPlaceholder>
      </TableCell>
      <TableCell style={{ width: "35%" }}>
        <TextPlaceholder ready={!showPlaceHolder}>
          <span>{timestampFormatted}</span>
        </TextPlaceholder>
      </TableCell>
      <TableCell style={{ width: "15%" }}>
        <TextPlaceholder ready={!showPlaceHolder}>
          <span>{transactionsCount}</span>
        </TextPlaceholder>
      </TableCell>
      <TableCell style={{ width: "20%" }}>
        <TextPlaceholder ready={!showPlaceHolder}>
          <span>{minerFormatted}</span>
        </TextPlaceholder>
      </TableCell>
      <TableCell style={{ width: "20%" }}>
        <TextPlaceholder ready={!showPlaceHolder}>
          <ProgressBar value={usedGasPercentage} />
        </TextPlaceholder>
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
