const EcommerceStore = artifacts.require("EcommerceStore");

module.exports = function (deployer) {
  deployer.deploy(EcommerceStore);
};
// const SimpleStorage = artifacts.require("SimpleStorage");
// const WTFApe = artifacts.require("WTFApe");

// module.exports = function (deployer) {
//   deployer.deploy(WTFApe);
// };
// 在我们的例子中，只有一个参数，就是一个候选者数组。第三个参数是一个哈希，我们用来指定部署代码所需的 gas。
// gas 数量会随着你的合约大小而变化。对于投票合约， 290000 就足够了。
// var Voting = artifacts.require("./Voting.sol");
// module.exports = function(deployer) {
// deployer.deploy(Voting, ['Alice', 'Bob', 'Cary'], {gas:
// 290000});
// };

