pragma solidity 0.4.15;
import "contracts/LuminiferousBank.sol";

contract Luminiferous {
  LuminiferousBank private lender; // Locked to Capital One Lumibank Contract
  address private borrower = 0x0;
  bool signed = false;

  uint public maximum_credit_limit = 2000;
  uint public requested_credit_limit = 0;
  uint public borrower_balance = 0;
  //uint public apr = 12; // percentage
  uint public eth_second_per_interest = 3784320; // 12% APR. inverse of traditional "APR" to avoid division

  uint created_at;
  uint interest_updated_at;

  // Constructor
  function Luminiferous() {
    // nothing for now...
    created_at = block.timestamp;
    interest_updated_at = block.timestamp;
  }

  event ContractUnsignedError();
  event ContractAlreadySignedError();
  event BorrowerAuthError();
  event RequestFunds(uint amount);

  // Fallback function!
  // remember: 2300 maximum gas
  function() payable {
    // Anyone can put money in.
  }

  // Step 0. The Lender sets the terms (currently hard-coded for testing and demo)
  function setLumibank(address bank) external {
    if(signed) {ContractAlreadySignedError(); return;}
    lender = LuminiferousBank(bank);
  }

  // Step 1. The Lender approves a specific borrower after checking their credit score
  function approve_borrower(address _borrower) external {
    if(signed) {ContractAlreadySignedError(); return;}
    if(msg.sender != address(lender)) {return;}
    borrower = _borrower;
  }

  // Step 2. The Borrower reviews the contract, agrees to the terms, signs the contract
  function sign_contract() external {
    if(msg.sender != borrower) { BorrowerAuthError(); return;}
    if(signed) {ContractAlreadySignedError(); return;}
    signed = true;
  }

  // Step 3. The Borrower asks the Lender to put money into the contract
  function updateCreditLimit(uint new_limit) external {
    if(!signed) {ContractUnsignedError(); return;}
    if(msg.sender != borrower) { BorrowerAuthError(); return;}
    if(borrower_balance > requested_credit_limit){ return; } // can't set the credit limit below your current balance
    requested_credit_limit = new_limit;
    RequestFunds(requested_credit_limit - borrower_balance);
    lender.request_funds(requested_credit_limit - borrower_balance); // Ask CapitalOne for funds
  }

  // Lender calls this to deposit the funds. Can't deposit more than the borrower asked for.
  function accept_funds() payable external {
    if(!signed) {ContractUnsignedError(); return;}
    if(msg.sender != address(lender)) {return;}
    // TODO: check that this only goes up to requested limit
    borrower_balance += msg.value; // funds are now available in the account
  }

  // Step 4. The Borrower can withdraw all funds into their personal account and spend them.
  //         note that unlike a normal contract, we don't need withdraw pattern here (only borrower can withdraw via this function)
  function withdraw() external {
    if(!signed) {ContractUnsignedError(); return;}
    if(msg.sender != borrower) { BorrowerAuthError(); return;}
    borrower.transfer(this.balance); 
  }

  // Step 5. Lender pings the contract to compute interest on the loan
  function compute_interest() external {
    if(!signed) {ContractUnsignedError(); return;}
    if(msg.sender != address(lender)) {return;}
    uint interest_period = block.timestamp - interest_updated_at; // in seconds
    borrower_balance = borrower_balance + (borrower_balance * interest_period / eth_second_per_interest); //overflow risk?
    interest_updated_at = block.timestamp;
  }

  // Step 6. Borrower makes a payment on the loan. Note that because this is payable you can
  //         send money along with it, which will update `this.balance`.
  function repay(bool reset_limit) payable external {
    if(!signed) {ContractUnsignedError(); return;}
    if(msg.sender != borrower) { BorrowerAuthError(); return;}
    uint repayment_amount = this.balance;
    bool result = lender.return_funds.value(repayment_amount)();
    if(result) {
      borrower_balance = borrower_balance - repayment_amount;
    }
    if(reset_limit) {
      requested_credit_limit = borrower_balance;
    }
  }

  // Step 7. Close the loan with a final payment (TODO)
}
