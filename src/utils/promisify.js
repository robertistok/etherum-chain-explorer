// source - https://ethereum.stackexchange.com/questions/11444/web3-js-with-promisified-api

const promisify = inner =>
  new Promise((resolve, reject) =>
    inner((err, res) => (err ? reject(err) : resolve(res)))
  );

export default promisify;
