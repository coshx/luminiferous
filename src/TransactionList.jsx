import React from 'react';
import { Link } from 'react-router-dom';
import LumiComponent from './LumiComponent';

class TransactionList extends LumiComponent {

  constructor(props) {
    super(props);

    this.state.logs = [];
  }
  lumiInit() {
    var that = this;

    var borrowed = this.state.lumi.borrowed({}, {fromBlock: 0, toBlock: 'latest'});
    borrowed.get( (err, borrowedLogs) => {
      var repayed = this.state.lumi.repayed({}, {fromBlock: 0, toBlock: 'latest'});
      repayed.get( (err, repayedLogs) => {
        var allLogs = [];
        allLogs.push(...borrowedLogs);
        allLogs.push(...repayedLogs);

        allLogs.sort( (a,b) => {
          var t1 = a.args.timestamp.toNumber() * 1000;
          var t2 = b.args.timestamp.toNumber() * 1000;
          return t1 - t2;
        });

        var humanLogs = allLogs.map( (log) => {
          var bal = log.args.amount.toNumber();
          var t = new Date(log.args.timestamp.toNumber() * 1000);

          if (log.event === 'borrowed') {
            return {
              description: "Credit Card Purchase ... " + t.toLocaleString(),
              amount: that.state.web3.fromWei(bal, 'ether') + " ETH"
            };
          } else {
            return {
              description: "Repayment ... " + t.toLocaleString(),
              amount: '(' + that.state.web3.fromWei(bal, 'ether') + ' ETH)'
            };
          }
        });

        that.setState({logs: humanLogs});
        console.log(humanLogs);
      });

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
          <Link className="add pure-button pure-button-primary" to="/tx">
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
