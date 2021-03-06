import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import getWeb3 from './utils/getWeb3';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './css/pure-grids-responsive-min.css';
import './css/font-awesome.min.css';
import './App.css';
import './Nav.css';
import './Header.css';
import './HeaderNav.css';
import './Home.css';
import Home from './Home';
import Nav from './Nav';
import HeaderNav from './HeaderNav';
import Report from './Report';
import Transaction from './Transaction';
import Offer from './Offer';
import OfferList from './OfferList';
import AcceptOffer from './AcceptOffer';
import Approved from './Approved';
import Header from './Header';
import Admin from './Admin';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null
    };

    var offers = [
      { id: 123,
        name: 'Capital One BChain Rewards Card',
        terms: {apr: 18.5, limit: 10000,
                balance_transfers: true,
                annual_fee_first_year: 0,
                annual_fee_subsequent_years: 95,
                credit_required: "excellent"} },
      { id: 234,
        name: 'Capital One BlockChain Card',
        terms: {apr: 23.0, limit: 5000,
                balance_transfers: false,
                annual_fee_first_year: 0,
                annual_fee_subsequent_years: 85,
                credit_required: "medium"} }
    ];

    this.OfferList = () => { return ( <OfferList offers={offers} /> ); };
    this.AcceptOffer = () => { return ( <AcceptOffer offer={offers[0]}/> ); };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <Header/>
              <div className="pure-u-1-6"/>
              <main className="pure-u-7-12">
                <HeaderNav/>
                <Switch>
                  <Route path="/offers/:id/accept" component={this.AcceptOffer}/>
                  <Route path="/offers" component={OfferList}/>
                  <Route path="/approved" component={Approved} />
                  <Route path="/report" component={Report}/>
                  <Route path="/admin" component={Admin}/>
                  <Route path="/tx" component={Transaction}/>
                  <Route path="/" component={Home}/>
                </Switch>
              </main>
              <div className="pure-u-1-6" />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
