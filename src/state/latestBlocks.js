import React, { useState, useEffect, useContext, createContext } from "react";

import { getLatestNBlocks } from "../utils/web3";
import useInterval from "../hooks/useInterval";

const useLatestBlocks = () => {
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [latestBlockNumber, setLatestBlockNumber] = useState(undefined);
  const [lastUpdated, setLastUpdated] = useState(undefined);

  const storeBlock = block =>
    setLatestBlocks(prev =>
      [...prev, block].sort((a, b) => b.number - a.number)
    );

  useEffect(() => {
    async function fetchData() {
      getLatestNBlocks({
        n: 10,
        storeBlock
      });
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (latestBlocks.length) {
      const firstBlock = latestBlocks[0];

      if (!latestBlockNumber || latestBlockNumber !== firstBlock.number) {
        setLatestBlockNumber(firstBlock.number);
      }
    }
  }, [latestBlocks, latestBlockNumber]);

  useInterval(() => {
    async function updateBlocks() {
      const fetchDataResponse = await window.web3.eth.getBlockNumber();

      if (fetchDataResponse !== latestBlockNumber) {
        getLatestNBlocks({
          n: fetchDataResponse - latestBlockNumber,
          storeBlock,
          latest: fetchDataResponse
        });
      }

      setLastUpdated(new Date().getTime());
    }

    updateBlocks();
  }, 10000);

  return { latestBlockNumber, latestBlocks, lastUpdated };
};

export const LatestBlocksStateContext = createContext();

export const LatestBlocksStateProvider = ({
  rowsCount,
  columnsCount,
  children
}) => (
  <LatestBlocksStateContext.Provider value={useLatestBlocks()}>
    {children}
  </LatestBlocksStateContext.Provider>
);
export const useLatestBlocksStateValue = () =>
  useContext(LatestBlocksStateContext);
