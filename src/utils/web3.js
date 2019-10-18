import { default as _range } from "lodash-es/range";

// partial source
// https://ethereum.stackexchange.com/questions/1587/how-can-i-get-the-data-of-the-latest-10-blocks-via-web3-js
export const getLatestNBlocks = async ({ latest, n = 10, storeBlock }) => {
  const web3 = window.web3;

  if (!latest) {
    latest = await web3.eth.getBlockNumber();
  }

  const blockNumbers = _range(latest, latest - n, -1);

  blockNumbers.forEach(blockNumber => {
    web3.eth.getBlock(blockNumber, (err, res) => {
      if (err) {
        console.log(err);
      }

      if (storeBlock) {
        storeBlock(res);
      }
    });
  });
};
