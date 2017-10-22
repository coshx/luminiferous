import React from 'react';
import LumiComponent from './LumiComponent';

class Report extends LumiComponent {
  constructor(props) {
    super(props);
    this.state.ethBalance = 0;
  }

  lumiInit() {
    var bal = this.state.web3.eth.getBalance(this.state.lumibank.address).toNumber();
    return this.setState({ethBalance: bal});
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
