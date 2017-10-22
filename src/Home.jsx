import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import CreditGraph from './CreditGraph';
import CreditScore from './CreditScore';
import TransactionList from './TransactionList';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <CreditGraph/>
        <CreditScore/>
        <TransactionList/>
      </div>
    );
  };
}

export default Home
