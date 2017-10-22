import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import getWeb3 from './utils/getWeb3';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './css/pure-grids-responsive-min.css';
import './css/font-awesome.min.css';
import './App.css';
import './Nav.css';
import Home from './Home';
import Nav from './Nav';
import Report from './Report';
import Transaction from './Transaction';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="pure-g">
            <div className="pure-u-1-1 pure-u-md-1-5">
              <Nav/>
            </div>
            <div className="pure-u-1 pure-u-md-4-5">
              <main className="container">
                <Switch>
                  <Route path="/report" component={Report}/>
                  <Route path="/tx" component={Transaction}/>
                  <Route path="/" component={Home}/>
                </Switch>
              </main>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
