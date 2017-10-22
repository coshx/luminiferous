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
    var that = this;
    console.log(wei,this.state.account);
    console.log(this.state.lumi.address);
    this.state.lumi.getBorrower.call().then( (bor) => {
      console.log("getBorrower:",bor);
    });
    this.state.web3.eth.getBalance(this.state.lumibank.address, (err, bal) => {
      console.log("lumibank balance: ",bal.toNumber())
    });
    this.state.web3.eth.getBalance(this.state.lumi.address, (err, bal) => {
      console.log("lumi balance: ",bal.toNumber())
    });
    this.state.lumi.request_credit.sendTransaction(wei, {from:this.state.account, gas:900000}).then( (err,res) => {
    //this.state.web3.eth.sendTransaction({from:this.state.account, to:this.state.lumibank.address, value: wei}, (err) => {
      console.log("requested credit...");
      that.state.web3.eth.getBalance(that.state.lumibank.address, (err, bal) => {
        console.log("lumibank balance: ",bal.toNumber())
      });
      that.state.web3.eth.getBalance(that.state.lumi.address, (err, bal) => {
        console.log("lumi balance: ",bal.toNumber())
      });
      that.state.lumi.withdraw({from:that.state.account}).then( function(r){
        console.log("withdrew to my account!");
        that.updateBalance();
        that.state.web3.eth.getBalance(that.state.lumibank.address, (err, bal) => {
          console.log("lumibank balance: ",bal.toNumber())
        });
        that.state.web3.eth.getBalance(that.state.lumi.address, (err, bal) => {
          console.log("lumi balance: ",bal.toNumber())
        });
      });
    });
    this.setState({amount: 0, repay_amount: 0});
  }

  handlePayment(event) {
    console.log("handePayment");
    event.preventDefault();
    var eth = this.state.repay_amount;
    var wei = this.state.web3.toWei(eth, 'ether');
    var that = this;

    this.state.lumi.repay.sendTransaction(true, {value: wei, from:this.state.account, gas:900000}).then( (err,res) => {
      console.log("making repayment...");
      that.state.web3.eth.getBalance(that.state.lumibank.address, (err, bal) => {
        console.log("lumibank balance: ",bal.toNumber())
      });
      that.state.web3.eth.getBalance(that.state.lumi.address, (err, bal) => {
        console.log("lumi balance: ",bal.toNumber())
      });
    });
    this.setState({amount: 0, repay_amount: 0});
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
