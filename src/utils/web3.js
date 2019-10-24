import { default as _range } from "lodash-es/range";

// value, this should be kept up to date ideally
const ETHER_VALUE_IN_USD = 160.1;

// partial source
// https://ethereum.stackexchange.com/questions/1587/how-can-i-get-the-data-of-the-latest-10-blocks-via-web3-js
export const getLatestNBlocks = async ({
  latest,
  n = 10,
  returnTransactionObjects = false,
  storeBlock
}) => {
  const web3 = window.web3;

  if (!latest) {
    latest = await web3.eth.getBlockNumber();
  }

  const blockNumbers = _range(latest, latest - n, -1);

  blockNumbers.forEach(blockNumber => {
    web3.eth.getBlock(blockNumber, returnTransactionObjects, (err, res) => {
      if (err) {
        console.log(err);
      }

      if (storeBlock) {
        storeBlock(res);
      }
    });
  });
};

export const formatHash = hash =>
  `${hash.slice(0, 4)}...${hash.slice(hash.length - 4)}`;

export const getEtherValueOfBlock = block =>
  block && block.transactions
    ? block.transactions
        .reduce((acc, t) => acc + Number(window.web3.utils.fromWei(t.value)), 0)
        .toFixed(2)
    : null;

export const getEtherValueInUSD = value =>
  (value * ETHER_VALUE_IN_USD).toFixed(2);
