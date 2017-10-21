var Luminiferous = artifacts.require("./Luminiferous.sol");
var LuminiferousBank = artifacts.require("./LuminiferousBank.sol");

contract('Luminiferous', function(accounts) {

  var capitalone = accounts[0];
  var michael = accounts[1];
  var ben = accounts[1];

  it("...capital one should fund the LumiBank", function() {
    var lumibank;
    return LuminiferousBank.deployed().then(function(_lumibank){
      lumibank = _lumibank;
      return Luminiferous.new();
    }).then(function(lumi){
      return lumi.setLumibank.call(lumibank.address);
    }).then(function(){
      return web3.eth.sendTransaction({from:capitalone, to:lumibank.address, value:100});
    }).then(function(){
      return web3.eth.getBalance(lumibank.address);
    }).then(function(bal){
      console.log(bal);
      assert.equal(bal,100);
    });
  });

});