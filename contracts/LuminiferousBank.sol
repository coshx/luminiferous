pragma solidity 0.4.15;

contract AbstractLumi {
  function accept_funds() payable external;
}

contract LuminiferousBank {
  uint created_at;
  event OhShitShitShit(uint wat);

  AbstractLumi lumi;

  // Constructor
  function LuminiferousBank() {
    // nothing for now...
    created_at = block.timestamp;
  }

  // Fallback function
  // remember: 2300 maximum gas
  function() payable {
    // Anyone can put money in.
  }

  function request_funds(uint _amount){
    // Here you would verify the contract.
    OhShitShitShit(_amount);
    lumi = AbstractLumi(msg.sender);
    lumi.accept_funds.value(_amount)();
  }

  function return_funds() payable returns (bool){
    return true;
    // Just accept all payments for now. $$$$$$$
  }

}
