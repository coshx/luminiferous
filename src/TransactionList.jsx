import React from 'react';
import { Link } from 'react-router-dom';
import LumiComponent from './LumiComponent';

class TransactionList extends LumiComponent {

  lumiInit() {
  }

  render() {
    return (
      <div className="TransactionList DashboardWidget pure-u-1-1">
        <div className="header">
          <span className="title">TRANSACTIONS</span>
          <Link className="add" to="/tx">
            <i className="fa fa-plus"/>
          </Link>
        </div>
        <div className="transaction">
        </div>
      </div>
    );
  };
}

export default TransactionList;
