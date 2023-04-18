const NftSwap = artifacts.require("NFTSwap");
module.exports = function (deployer) {
  deployer.deploy(NftSwap);
};