import React from 'react';
import { Link } from 'react-router-dom';
import LumiComponent from './LumiComponent';

class TransactionList extends LumiComponent {

  constructor(props) {
    super(props);

    this.state.borrowedlog = [];
  }
  lumiInit() {
    var borrowed = this.state.lumi.borrowed({}, {fromBlock: 0, toBlock: 'latest'});
    var repayed = this.state.lumi.repayed({}, {fromBlock: 0, toBlock: 'latest'});
    this.setState({borrowedlog: []});

    borrowed.get( (err, logs) => {
      var that = this;

      var human_logs = logs.map(function(log){
        var bal = log.args.amount.toNumber();
        var t = new Date(log.args.timestamp.toNumber()*1000);
        console.log(t);
        return {
          description: "Credit Card Payment ... " + t.toLocaleString(),
          amount: that.state.web3.fromWei(bal, 'ether')+" ETH"
        };
      });

      console.log(human_logs);
      this.setState({borrowedlog: human_logs});

    });

    repayed.get( (err, logs) => {
      var that = this;

      var human_logs = logs.map(function(log){
        var bal = log.args.amount.toNumber();
        var t = new Date(log.args.timestamp.toNumber()*1000);
        console.log(t);
        return {
          description: "Repayed ... " + t.toLocaleString(),
          amount: "-" + that.state.web3.fromWei(bal, 'ether')+" ETH"
        };
      });

      console.log(human_logs);
      this.setState({repayedlog: human_logs});

    });

  }

  render() {
    var logs = this.state.borrowedLogs.push(this.state.repayedLogs);
    var txList = logs.map( (log) => {
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
