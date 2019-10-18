import React, { createContext, useContext } from "react";
import Web3 from "web3";

export const EtherumProviderContext = createContext();

const EtherumProvider = ({ rowsCount, columnsCount, children }) => {
  if (typeof window.web3 !== "undefined" && window.web3.eth) {
    // Web3 browser user detected. You can now use the provider.

    window.web3 = new Web3(window.web3.currentProvider);

    return (
      <EtherumProviderContext.Provider value={window.web3.eth}>
        {children}
      </EtherumProviderContext.Provider>
    );
  }

  return <span>Please install Metamask first</span>;
};
export const useEtherumProviderValue = () => useContext(EtherumProviderContext);

export default EtherumProvider;
