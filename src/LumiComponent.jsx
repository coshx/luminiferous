import React, { Component } from 'react';
import Luminiferous from '../build/contracts/Luminiferous.json';
import LuminiferousBank from '../build/contracts/LuminiferousBank.json';
import getWeb3 from './utils/getWeb3';

/**
 * React Component for interfacing with the Luminiferous Contracts.
 *
 * LumiComponents will extend this class, and should override both
 * lumiInit() and render().
 *
 * lumiInit() will be called after connecting to ethereum,
 * so you can access variables like state.lumi and state.lumiBank
 *
 */
class LumiComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: null,
      lumi: null,
      lumibank: null,
      account: null
    };
  }

  componentWillMount() {
    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });

        this.instantiateContract();
      })
      .catch( () => {
        console.log('Error finding web3.');
      });
  }

  instantiateContract() {
    const contract = require('truffle-contract');
    const luminiferousContract = contract(Luminiferous);
    const luminiferousBankContract = contract(LuminiferousBank);
    luminiferousBankContract.setProvider(this.state.web3.currentProvider);
    luminiferousContract.setProvider(this.state.web3.currentProvider);

    // get accounts
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({account:accounts[0]});
      luminiferousBankContract.deployed().then((lumibank) => {
        this.setState({lumibank: lumibank});
        return luminiferousContract.deployed();
      }).then( (lumi) => {
        this.setState({lumi: lumi});
        console.log(this.state.lumibank.address);
        return lumi.setLumibank.sendTransaction(this.state.lumibank.address,{from:this.state.account});
      }).then( () => {
        return this.state.lumi.getBank.call()
      }).then( (bank) => {
        console.log(bank);
        console.log("Done!");
        return this.lumiInit();
      });
    });
  }

  lumiInit() {
    console.log("This is the default lumiInit() that you should override in your subclass.");
  }

  render() {
    return (
      <div className="lumiComponent">
        <h1>Stock LumiComponent</h1>
        <p>Please override render() in your LumiComponent subclass</p>
      </div>
    );
  };
}

export default LumiComponent;
