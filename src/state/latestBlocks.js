import React, { useState, useEffect, useContext, createContext } from "react";

import { getLatestNBlocks } from "../utils/web3";
import useInterval from "../hooks/useInterval";

const useLatestBlocks = () => {
  const cachedBlocks = JSON.parse(localStorage.getItem("latestBlocks"));

  const [latestBlocks, setLatestBlocks] = useState(cachedBlocks || []);
  const [latestBlockNumber, setLatestBlockNumber] = useState(
    cachedBlocks ? cachedBlocks[0].number : undefined
  );
  const [lastUpdated, setLastUpdated] = useState(undefined);

  const storeBlock = block =>
    setLatestBlocks(prev =>
      [...prev, block]
        .filter(block => Boolean(block))
        .sort((a, b) => b.number - a.number)
    );

  async function fetchNewBlocks() {
    const fetchDataResponse = await window.web3.eth.getBlockNumber();

    if (fetchDataResponse !== latestBlockNumber) {
      const numberOfBlocksToFetch = latestBlockNumber
        ? fetchDataResponse - latestBlockNumber
        : 10;
      getLatestNBlocks({
        n: numberOfBlocksToFetch,
        storeBlock,
        latest: fetchDataResponse
      });
    }
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
    setLastUpdated(new Date().getTime());
  }, 10000);

  return { latestBlockNumber, latestBlocks, lastUpdated, storeBlock };
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
