var Luminiferous = artifacts.require("./Luminiferous.sol");
var LuminiferousBank = artifacts.require("./LuminiferousBank.sol");

contract('Luminiferous', function(accounts) {

  var capitalone = accounts[0];
  var michael = accounts[1];
  var ben = accounts[2];

  it("...capital one should fund the LumiBank", function() {
    var lumibank;
    return LuminiferousBank.new().then(function(_lumibank){
      lumibank = _lumibank;
      return Luminiferous.new();
    }).then(function(lumi){
      return lumi.setLumibank.sendTransaction(lumibank.address, {from:capitalone});
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
    return LuminiferousBank.new().then(function(_lumibank){
      lumibank = _lumibank;
      return Luminiferous.new();
    }).then(function(_lumi){
      lumi = _lumi;
      return lumi.setLumibank.sendTransaction(lumibank.address, {from:capitalone});
    }).then(function(){
      return lumi.approve_borrower.sendTransaction(michael, {from:capitalone});
    }).then(function(){
      return lumi.sign_contract.sendTransaction({from:michael});
    }).then(function(){
      return lumi.compute_interest.sendTransaction({from:capitalone});
    }).then(function(){
      return web3.eth.getBalance(lumi.address);
    }).then(function(bal){
      assert.equal(bal,0);
    });
  });

  it("...wombats fucking a badger to death", function() {
    var lumibank;
    var lumi;
    return LuminiferousBank.new().then(function(_lumibank){
      lumibank = _lumibank;
      return Luminiferous.new();
    }).then(function(_lumi){
      lumi = _lumi;
      return lumi.setLumibank.sendTransaction(lumibank.address, {from:capitalone});
    }).then(function(){
      return web3.eth.sendTransaction({from:capitalone, to:lumibank.address, value:100});
    }).then(function(){
      return lumi.approve_borrower.sendTransaction(michael, {from:capitalone});
    }).then(function(){
      return lumi.sign_contract.sendTransaction({from:michael});
    }).then(function(){
      return lumi.request_credit.sendTransaction(12, {from:michael, gas:900000});
    }).then(function(){
      return web3.eth.getBalance(lumi.address);
    }).then(function(bal){
      assert.equal(bal,12);
    });
  });

});