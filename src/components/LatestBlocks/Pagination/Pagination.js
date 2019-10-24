import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Text } from "@aragon/ui";

const Pagination = ({ items = [], itemsPerPage = 10, page = 1, setPage }) => {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePageChange = event => {
    const { name } = event.target;

    if (name === "prev") {
      setPage(page - 1);
    } else if (name === "next") {
      setPage(page + 1);
    }
  };

  return (
    <Root>
      <Button
        aria-label="Previous page"
        disabled={page === 1}
        name="prev"
        mode="strong"
        onClick={handlePageChange}
        tabindex="0"
      >
        Previous
      </Button>
      <Text aria-label={`Page ${page} of ${totalPages}`} smallcaps tabIndex="0">
        Page {page} of {totalPages}
      </Text>
      <Button
        aria-label="Next page"
        disabled={totalItems <= itemsPerPage * page}
        name="next"
        mode="strong"
        onClick={handlePageChange}
        tabindex="0"
      >
        Next
      </Button>
    </Root>
  );
};

Pagination.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  itemsPerPage: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.func
};

Pagination.defaultProps = {
  items: [],
  itemsPerPage: 10,
  page: 1
};

const Root = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0px 0px;
`;

export default Pagination;
