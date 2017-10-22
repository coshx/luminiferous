import React from 'react';
import LumiComponent from './LumiComponent';

class Transaction extends LumiComponent {
  constructor(props) {
    super(props);
    this.state.amount = 0;
    this.state.repay_amount = 0;
    this.state.ethBalance = 0;
    this.state.ethCredit = 0;
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleRepayAmountChange = this.handleRepayAmountChange.bind(this);   
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.updateBalance = this.updateBalance.bind(this);

    var that = this;
    setInterval(function(){that.updateBalance();},200); // for demo
  }

  updateBalance() {
    var that = this;
    this.state.web3.eth.getBalance(that.state.account, (err, bal) => {
      var ethBal = that.state.web3.fromWei(bal, 'ether').toNumber();
      that.setState({ethBalance: ethBal});
    });
    this.state.lumi.getBorrowerBalance.call().then( (bal) => {
      var ethBal = that.state.web3.fromWei(bal, 'ether').toNumber();
      that.setState({ethCredit: ethBal});
    });
  }

  lumiInit() {
    this.updateBalance();
  }

  handleAmountChange(event) {
    var amt = event.target.value;
    // TODO: check if amount is larger than allowed

    this.setState({amount: amt});
  }
  handleRepayAmountChange(event) {
    var amt = event.target.value;
    // TODO: check if amount is larger than allowed

    this.setState({repay_amount: amt});
  }

  handleSubmit(event) {
    event.preventDefault();
    var eth = this.state.amount;
    var wei = this.state.web3.toWei(eth, 'ether');
    this.setState({amount: 0});
    var that = this;
    
    console.log("requested more credit...");
    this.state.lumi.request_credit.sendTransaction(wei, {from:this.state.account, gas:900000}).then( (err,res) => {
      console.log("withdrawing funds to my account...");
      that.state.lumi.withdraw({from:that.state.account}).then( function(r){        
        console.log("Done!");
        that.updateBalance();
      });
    });
  }

  handlePayment(event) {
    console.log("handePayment");
    event.preventDefault();
    var eth = this.state.repay_amount;
    var wei = this.state.web3.toWei(eth, 'ether');
    this.setState({repay_amount: 0});
    var that = this;

    console.log("making repayment...");
    this.state.lumi.repay.sendTransaction({value: wei, from:this.state.account, gas:900000}).then( (err,res) => {
      console.log("Done!");
    });
    
  }

  render() {
    return (
      <div className="transaction">
        <h2>Balance: {this.state.ethBalance}</h2>
        <h2>Loaned: {this.state.ethCredit}</h2>
        <hr/>
        <h1>Withdraw from credit</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Withdrawl in ETH:
            <input type="text" value={this.state.amount} onChange={this.handleAmountChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h1>Make payment on loan</h1>
        <form onSubmit={this.handlePayment}>
          <label>
            Repay in ETH:
            <input type="text" value={this.state.repay_amount} onChange={this.handleRepayAmountChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        
      </div>
    );
  };
}

export default Transaction;
