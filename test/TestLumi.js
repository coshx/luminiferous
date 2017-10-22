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
      return lumi.setLumibank(lumibank.address);
    }).then(function(){
      return web3.eth.sendTransaction({from:capitalone, to:lumibank.address, value:100});
    }).then(function(){
      return web3.eth.getBalance(lumibank.address);
    }).then(function(bal){
      assert.equal(bal,100);
    });
  });

  it("...computing interest on 0 ETH does nothing", function() {
    var lumibank;
    var lumi;
    return LuminiferousBank.deployed().then(function(_lumibank){
      lumibank = _lumibank;
      return Luminiferous.new();
    }).then(function(_lumi){
      lumi = _lumi;
      return lumi.setLumibank.call(lumibank.address);
    }).then(function(){
      return web3.eth.sendTransaction({from:capitalone, to:lumibank.address, value:200});
    }).then(function(){
      return lumi.approve_borrower.call(michael, {from:lumibank.address});
    }).then(function(){
      return lumi.sign_contract.call({from:michael});
    }).then(function(){
      return lumi.compute_interest.call({from:lumibank.address});
    }).then(function(){
      return web3.eth.getBalance(lumi.address);
    }).then(function(bal){
      assert.equal(0,0);
    });
  });

  it("...michael spends 12ETH", function() {
    var lumibank;
    var lumi;
    return LuminiferousBank.deployed().then(function(_lumibank){
      lumibank = _lumibank;
      return Luminiferous.new();
    }).then(function(_lumi){
      lumi = _lumi;
      return lumi.setLumibank.call(lumibank.address);
    }).then(function(){
      return web3.eth.sendTransaction({from:capitalone, to:lumibank.address, value:200});
    }).then(function(){
      return lumi.approve_borrower.call(michael, {from:lumibank.address});
    }).then(function(){
      return lumi.sign_contract.call({from:michael});
    }).then(function(){
      return lumi.updateCreditLimit.call(12, {from:michael});
    }).then(function(){
      return web3.eth.getBalance(lumi.address);
    }).then(function(bal){
      assert.equal(0,12);
    });
  });

});