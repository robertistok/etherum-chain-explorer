import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { Button } from "@aragon/ui";

import Block from "./Block";

const BlockPage = ({ number }) => {
  const numberParsed = Number(number);

  return (
    <Root>
      <NavigationContainer>
        <Link to={`/block/${numberParsed - 1}`}>
          <Button mode="secondary">Previous block</Button>
        </Link>
        <Link to="/">
          <Button mode="strong">Home</Button>
        </Link>
        <Link to={`/block/${numberParsed + 1}`}>
          <Button mode="secondary">Next block</Button>
        </Link>
      </NavigationContainer>

      <Block number={numberParsed} />
    </Root>
  );
};

const Root = styled.section``;

const NavigationContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export default BlockPage;
