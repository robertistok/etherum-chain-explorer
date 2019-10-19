import { useState, useEffect } from "react";

import { getLatestNBlocks } from "../utils/web3";
import useInterval from "../hooks/useInterval";

const useLatestBlocks = () => {
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [latestBlock, setLatestBlock] = useState(undefined);

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

      if (!latestBlock || latestBlock.number !== firstBlock.number) {
        setLatestBlock(firstBlock);
      }
    }
  }, [latestBlocks, latestBlock]);

  useInterval(() => {
    async function updateBlocks() {
      const fetchDataResponse = await window.web3.eth.getBlockNumber();

      if (fetchDataResponse !== latestBlock.number) {
        getLatestNBlocks({
          n: fetchDataResponse - latestBlock.number,
          storeBlock,
          latest: fetchDataResponse
        });
      }
    }

    updateBlocks();
  }, 10000);

  return [{ latestBlock, latestBlocks }];
};

export default useLatestBlocks;
