import React, { useState, useEffect, useContext, createContext } from "react";

import { getLatestNBlocks } from "../utils/web3";
import { useInterval } from "../hooks";

const useLatestBlocks = () => {
  const cachedBlocks = JSON.parse(localStorage.getItem("latestBlocks"));

  const [latestBlocks, setLatestBlocks] = useState(cachedBlocks || []);
  const [latestBlockNumber, setLatestBlockNumber] = useState(
    cachedBlocks ? cachedBlocks[0].number : undefined
  );
  const [lastUpdated, setLastUpdated] = useState(undefined);

  const storeBlock = block =>
    setLatestBlocks(prev => {
      const newValue = prev.find(b => b.number === block.number)
        ? prev
        : [...prev, block];

      return newValue
        .filter(block => Boolean(block))
        .sort((a, b) => b.number - a.number);
    });

  const findBlock = blockNumber =>
    latestBlocks.find(b => b && b.number === blockNumber);

  async function fetchNewBlocks() {
    const fetchDataResponse = await window.web3.eth.getBlockNumber();

    if (fetchDataResponse !== latestBlockNumber) {
      const numberOfBlocksToFetch = latestBlockNumber
        ? fetchDataResponse - latestBlockNumber
        : 10;
      getLatestNBlocks({
        n: numberOfBlocksToFetch,
        returnTransactionObjects: true,
        storeBlock,
        latest: fetchDataResponse
      });
    }

    setLastUpdated(new Date().getTime());
  }

  useEffect(() => {
    fetchNewBlocks();
    // we want to run this only once, as we are going to get the update in the interval
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //

  // cache the last 10 blocks
  useEffect(() => {
    if (latestBlocks.length) {
      localStorage.setItem(
        "latestBlocks",
        JSON.stringify(latestBlocks.slice(0, 10))
      );
    }
  }, [latestBlocks]);

  useEffect(() => {
    if (latestBlocks.length) {
      const firstBlock = latestBlocks[0];

      if (!latestBlockNumber || latestBlockNumber !== firstBlock.number) {
        setLatestBlockNumber(firstBlock.number);
      }
    }
  }, [latestBlocks, latestBlockNumber]);

  useInterval(() => {
    fetchNewBlocks();
  }, 10 * 1000);

  return {
    latestBlockNumber,
    latestBlocks,
    lastUpdated,
    storeBlock,
    findBlock
  };
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
