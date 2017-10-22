import React from 'react';
import { Link } from 'react-router-dom';
import LumiComponent from './LumiComponent';

class TransactionList extends LumiComponent {

  constructor(props) {
    super(props);

    this.state.logs = [];
  }
  lumiInit() {
    var borrowed = this.state.lumi.borrowed({}, {fromBlock: 0, toBlock: 'latest'});
    borrowed.get( (err, logs) => {
      this.setState({logs: logs});
      console.dir(logs);

      // mocked up (for now)
      this.setState({logs: [
        {description: 'Credit Card Payment 10/16', amount: '$204.12 = 0.686 ETH'},
        {description: 'Credit Card Payment 10/1', amount: '$1672.34 = 5.616 ETH'}
      ]});

    });

  }

  render() {
    var txList = this.state.logs.map( (log) => {
      return (
        <div className="transaction">
          <span className="description">{log.description}</span>
          <span className="amount">{log.amount}</span>
        </div>
      );
    });
    return (
      <div className="TransactionList DashboardWidget pure-u-1-1">
        <div className="header">
          <span className="title">TRANSACTIONS</span>
          <Link className="add" to="/tx">
            <i className="fa fa-plus"/>
          </Link>
        </div>
        <div className="transaction">
          {txList}
        </div>
      </div>
    );
  };
}

export default TransactionList;
