pragma solidity 0.4.15;
import "contracts/LuminiferousBank.sol";

contract Luminiferous {
  LuminiferousBank private lender; // Could be hardcoded to a Capital One Lumibank Contract
  address private borrower;
  bool public signed;

  uint public maximum_credit_limit;
  uint public borrower_balance;
  uint public eth_second_per_interest = 262800000; // 12% APR. Inverse of traditional "APR" to avoid long division

  uint created_at;
  uint interest_updated_at;

  // Permanent events stored on the blockchain
  //   - 3rd parties use these to compute credit scores etc.
  event borrowed(uint amount, uint timestamp);
  event repayed(uint amount, uint timestamp);

  // Constructor
  function Luminiferous() {
    // nothing for now...
    created_at = block.timestamp;
    interest_updated_at = block.timestamp;
    signed = false;
    maximum_credit_limit = 30000000000000000000; // 30ETH
    borrower_balance = 0;
  }

  // Helper functions
  function isSigned() external returns (bool) {
    return signed && (borrower > 0);
  }
  function getBank() external returns (address) {
    return address(lender);
  }
  function getBorrower() external returns (address) {
    return borrower;
  }
  function getBorrowerBalance() external returns (uint) {
    return borrower_balance;
  }
  function isLender(address _addr) returns (bool) {
    return address(lender) == _addr;
  }
  function isBorrower(address _addr) returns (bool) {
    return borrower == _addr;
  }

  // Modifiers
  modifier onlysigned {
    require(signed);
    require(borrower > 0);
    _;
  }
  modifier onlyunsigned {
    require(!signed);
    _;
  }
  modifier onlyborrower {
    require(isBorrower(msg.sender));
    _;
  }
  modifier onlylender {
    require(isLender(msg.sender));
    _;
  }

  // Default fallback function
  function() payable {
    // Anyone can deposit money if they really want to.
    // Only normal use case would be the bank issuing a refund for fraud/etc.
  }

  // Step 0. The Lender sets the terms of the contract (currently hard-coded for testing and demo).
  function setLumibank(address bank) onlyunsigned external {
    lender = LuminiferousBank(bank);
  }

  // Step 1. The Lender approves a specific borrower after checking their
  //         credit score / verifying identity.
  function approve_borrower(address _borrower) external {
    borrower = _borrower;
  }

  // Step 2. The Borrower reviews the contract, agrees to the terms, signs the contract.
  function sign_contract() onlyunsigned onlyborrower external {
    signed = true;
  }

  // Step 3. The Borrower asks the Lender to put more money into the contract.
  function request_credit(uint increase) onlysigned onlyborrower external {
    uint credit_amount = borrower_balance + increase;
    if(credit_amount > maximum_credit_limit) { return; } // not any more than max credit limit
    lender.request_funds(credit_amount); // Ask CapitalOne Lumibank for funds

    borrowed(credit_amount, block.timestamp);
  }

  // Lender callback to actually deposit the funds.
  function accept_funds() payable external { // temporarily removed 'onlysigned onlylender' for demo
    borrower_balance += msg.value;
  }

  // Step 4. The Borrower can withdraw all funds into their personal account and spend them.
  //         note: unlike a normal contract, we don't need to use a withdraw pattern here
  //         (only borrower can withdraw via this function, no re-entrancy worries)
  function withdraw() onlysigned onlyborrower external {
    borrower.transfer(this.balance);
  }

  // Step 5. Lender pings the contract to compute interest on the loan
  function compute_interest() onlysigned external {

    // In real life this would be based on the block.timestamp ... 
    //uint interest_period = block.timestamp - interest_updated_at; // in seconds

    uint interest_period = 30 days; // ... for demo purposes we just pretend 30 days.
    borrower_balance = borrower_balance + (borrower_balance * interest_period / eth_second_per_interest);
    interest_updated_at = block.timestamp;
  }

  // Step 6. Borrower makes a payment on the loan. Note that because this is payable you can
  //         send money along with it, which will update `this.balance` before it runs.
  function repay() payable onlysigned onlyborrower external {
    uint repayment_amount = this.balance;
    if(repayment_amount > borrower_balance) {
      repayment_amount = borrower_balance; // can't pay back more than the balance due.
    }
    bool result = lender.return_funds.value(repayment_amount)();
    if(result) {
      borrower_balance = borrower_balance - repayment_amount;
    }
    repayed(repayment_amount, block.timestamp);
  }

  // Step 7. Close the loan with a final payment (TODO)
}
