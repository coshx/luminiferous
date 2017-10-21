var Luminiferous = artifacts.require("./Luminiferous.sol");
var LuminiferousBank = artifacts.require("./LuminiferousBank.sol");

module.exports = function(deployer) {
  deployer.deploy(Luminiferous);
  deployer.deploy(LuminiferousBank);
};
