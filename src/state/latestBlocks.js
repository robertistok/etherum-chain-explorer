import { useReducer, useState, useEffect } from "react";

import { getLatestNBlocks } from "../utils/web3";

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

      if (atestBlock) {
        console.log(latestBlock.number, firstBlock.number);
      }
      if (!latestBlock || latestBlock.number !== firstBlock.number) {
        setLatestBlock(firstBlock);
      }
    }
  }, [latestBlocks, latestBlock]);

  useEffect(() => {
    let fetchDataResponse;
    let timeout;
    let interval;

    async function fetchData() {
      fetchDataResponse = await window.web3.eth.getBlockNumber();

      console.log(fetchDataResponse);

      if (fetchDataResponse === latestBlock.number) {
        console.log("yay");
      } else {
        getLatestNBlocks({
          n: fetchDataResponse - latestBlock.number,
          storeBlock,
          latest: fetchDataResponse
        });
      }
    }

    if (latestBlock) {
      timeout = setTimeout(
        () =>
          setInterval(() => {
            interval = fetchData();
          }, 10000),
        10000
      );
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [latestBlock]);

  return [{ latestBlock, latestBlocks }];
};

export default useLatestBlocks;
