import React, { createContext, useContext } from "react";
import Web3 from "web3";
import styled from "styled-components";
import { ExternalLink, Text } from "@aragon/ui";

export const EtherumProviderContext = createContext();

const EtherumProvider = ({ rowsCount, columnsCount, children }) => {
  if (typeof window.web3 !== "undefined" && window.web3.eth) {
    // Web3 browser user detected. You can now use the provider.
    // use the latest version of web3
    window.web3 = new Web3(window.web3.currentProvider);

    return (
      <EtherumProviderContext.Provider value={window.web3.eth}>
        {children}
      </EtherumProviderContext.Provider>
    );
  }

  return (
    <NoDappSupportMessage aria-label="No support for Dapps detected in your browser. Please install MetaMask and try again!">
      No support for Dapps detected in your browser. Please install&nbsp;
      <ExternalLink href="https://metamask.io/">Metamask</ExternalLink>
      &nbsp;and try again! 🙌
    </NoDappSupportMessage>
  );
};

const NoDappSupportMessage = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 40px);
  font-size: 20px;
`;

export const useEtherumProviderValue = () => useContext(EtherumProviderContext);

export default EtherumProvider;
