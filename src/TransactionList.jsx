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
      var that = this;
      this.setState({logs: logs});
      console.dir(logs);

      var human_logs = logs.map(function(log){
        var bal = log.args.amount.toNumber();
        var t = new Date(log.args.timestamp.toNumber()*1000);
        console.log(t);
        if(log.event === "borrowed") {
          return {
            description: "Credit Card Payment ... " + t.toLocaleString(),
            amount: that.state.web3.fromWei(bal, 'ether')+" ETH"
          };
        } else {
          return {
            description: "Repayment ...(date)",
            amount: that.state.web3.fromWei(bal, 'ether')+" ETH"
          };
        }

      });

      // var human_logs = [
      //   {description: 'Credit Card Payment 10/16', amount: '$204.12 = 0.686 ETH'},
      //   {description: 'Credit Card Payment 10/1', amount: '$1672.34 = 5.616 ETH'}
      // ];

      console.log(human_logs);
      this.setState({logs: human_logs});

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
