import React from 'react';
import LumiComponent from './LumiComponent';

class Report extends LumiComponent {

  constructor(props) {
    super(props);
    this.state.ethBalance = 0;
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

  render() {
    return (
      <div className="report">
        <h1>My Credit Report</h1>
        <p>Current ETH Balance: {this.state.ethBalance}</p>
      </div>
    );
  };
}

export default Report;
