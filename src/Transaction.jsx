import React from 'react';
import LumiComponent from './LumiComponent';

class Transaction extends LumiComponent {
  constructor(props) {
    super(props);
    this.state.amount = 0;
    this.state.ethBalance = 0;
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateBalance = this.updateBalance.bind(this);
  }

  updateBalance() {
    var that = this;
    this.state.web3.eth.getBalance(that.state.account, (err, bal) => {
      var ethBal = that.state.web3.fromWei(bal, 'ether').toNumber();
      that.setState({ethBalance: ethBal});
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

  handleSubmit(event) {
    event.preventDefault();
    var eth = this.state.amount;
    if (eth < 0) {
      eth = -1 * eth;
      var wei = this.state.web3.toWei(eth, 'ether');
      this.state.web3.eth.sendTransaction({from:this.state.account, to:this.state.lumibank.address, value: wei}, (err) => {
        setTimeout( () => {
          this.updateBalance();
          this.setState({amount: 0});
        }, 5000);
      });
    } else {
      // TODO: can't go this way.
      this.state.web3.eth.sendTransaction({
        from:this.state.lumibank.address,
        to:this.state.account,
        value: eth
      }, console.log);
    }
  }

  render() {
    return (
      <div className="transaction">
        <h1>Create Transaction</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Amount:
            <input type="text" value={this.state.amount} onChange={this.handleAmountChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h2>Balance: {this.state.ethBalance}</h2>
      </div>
    );
  };
}

export default Transaction;
