import React from "react";
import styled from "styled-components";
import { Router } from "@reach/router";
import { Main } from "@aragon/ui";

import EtherumProvider from "./components/EtherumProvider";
import LatestBlocks from "./components/LatestBlocks";
import BlockPage from "./components/BlockPage";

import { LatestBlocksStateProvider } from "./state/latestBlocks";

const App = () => {
  return (
    <Root>
      <Main>
        <EtherumProvider>
          <LatestBlocksStateProvider>
            <Router>
              <LatestBlocks path="/" />
              <BlockPage path="block/:number" />
            </Router>
          </LatestBlocksStateProvider>
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
