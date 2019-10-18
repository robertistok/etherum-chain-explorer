import React from "react";
import styled from "styled-components";
import { Router } from "@reach/router";
import { Main } from "@aragon/ui";

import EtherumProvider from "./components/EtherumProvider";
import LatestBlocks from "./components/LatestBlocks";
import Block from "./components/Block";

const App = () => {
  return (
    <Root>
      <Main>
        <EtherumProvider>
          <Router>
            <LatestBlocks path="/" />
            <Block path="block/:number" />
          </Router>
        </EtherumProvider>
      </Main>
    </Root>
  );
};

const Root = styled.main`
  flex-direction: column;
  display: flex;
  max-width: 80%;
  margin: 20px auto;
`;

export default App;
