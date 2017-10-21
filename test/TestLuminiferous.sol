pragma solidity 0.4.15;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Luminiferous.sol"; // Bank is included here already.

contract TestLuminiferous {
  LuminiferousBank lumibank;
  Luminiferous lumi;

  // Test with testrpc -d lumin to make sure these address show up
  address michael = 0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1; // Someone with good credit
  address ben = 0xffcf8fdee72ac11b5c542428b35eef5769c409f0; // Someone with bad credit
  address capitalone = 0x22d491bde2303f2f43325b2108d26f1eaba1e32b; // The Best Bank Ever

  function beforeAll() {
    lumibank = LuminiferousBank(DeployedAddresses.LuminiferousBank());
  }

  function beforeEach() {
    lumi = new Luminiferous();
    lumi.setLumibank(address(lumibank));
  }

  function testDummy() {
    Assert.equal(true, true, "True is true");
  }

  // [Finnicky] Solidity tests have no documentation so I can't figure out how to do anything...
  // function testFundLumiBank() {
  //   lumibank.transfer(100);
  //   Assert.equal(lumibank.balance, 100, "Capital One deposited money into the Lumibank Contract");
  // }

}
