pragma solidity 0.4.15;

contract LuminiferousBank {
  uint created_at;
  address owner;

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
    msg.sender.transfer(_amount);
  }

  function return_funds() payable returns (bool){
    return true;
    // Just accept all payments for now. $$$$$$$
  }

}
