import React from 'react';
import { Link } from 'react-router-dom';
import LumiComponent from './LumiComponent';
import Luminiferous from '../build/contracts/Luminiferous.json';
import LuminiferousBank from '../build/contracts/LuminiferousBank.json';

class Admin extends LumiComponent {

  constructor(props) {
    super(props);

    this.state.borrowerAddress = ''; //input field
    this.state.borrower = 0;
    this.state.balance = 0;
    this.state.bank = 0;
    this.state.signed = false;

    this.signContract = this.signContract.bind(this);
    this.updateBorrowerAddress = this.updateBorrowerAddress.bind(this);
    this.setupContract = this.setupContract.bind(this);
    this.approveBorrower = this.approveBorrower.bind(this);
    this.fundLumibank = this.fundLumibank.bind(this);
    this.calcInterest = this.calcInterest.bind(this);
    this.updateStats = this.updateStats.bind(this);

    var that = this;
    this.admintimer = setInterval(function(){
      that.updateStats();
    },100); // for demo
  }

  lumiInit() {

  }

  componentWillUnmount() {
    clearInterval(this.admintimer);
  }

  updateStats() {
    var that = this;
    this.state.lumi.isSigned.call().then( (signed) => {
      var signatureState = signed;
      that.setState({signed: signatureState ? "true" : "false"});
    });
    this.state.lumi.getBank.call().then( (bank) => {
      var bankAddr = bank;
      that.setState({bank: bankAddr});
    });
    this.state.lumi.getBorrower.call().then( (borrower) => {
      var b = borrower;
      that.setState({borrower:b});
    });
    this.state.web3.eth.getBalance(that.state.lumibank.address, (err,bal) => {
      var ethBal = that.state.web3.fromWei(bal, 'ether').toNumber();
      that.setState({balance: ethBal});
    });
  }

  updateBorrowerAddress(event) {
    var val = event.target.value;
    this.state.borrowerAddress = val;
  }
  signContract(event) {
    event.preventDefault();
    console.log("signContract");
    this.state.lumi.sign_contract
      .sendTransaction({from:this.state.account}).then( () => {
        console.log("Done!");
        this.state.lumi.getBorrower.call().then( (bor) => {
          console.log("getBorrower:",bor);
        });
        this.state.lumi.isSigned.call().then( (bor) => {
          console.log("isSigned:",bor);
        });
      })
  }
  approveBorrower(event){
    event.preventDefault();
    console.log("approveBorrower");
    var borrower = this.state.borrowerAddress;
    console.log("borrower address:", borrower);
    this.state.lumi.approve_borrower
      .sendTransaction(borrower, {from:this.state.account}).then( () => {
        console.log("Done!");
        this.state.lumi.getBorrower.call().then( (bor) => {
          console.log("getBorrower:",bor);
        });
      })
  }
  setupContract(event){
    event.preventDefault();
    console.log("setupContract");

    this.state.lumi.setLumibank
      .sendTransaction(this.state.lumibank.address,{from:this.state.account}).then( () => {
        console.log("Done!");
      });
  }
  fundLumibank(event){
    event.preventDefault();
    console.log("fundLumibank");

    this.state.web3.eth.sendTransaction({from:this.state.account, to:this.state.lumibank.address, value:20000000000000000000}, function(){
      console.log("Done!");
    });
  }
  calcInterest(event){
    event.preventDefault();
    console.log("calcInterest");

    this.state.lumi.compute_interest
      .sendTransaction({from:this.state.account}).then( () => {
        console.log("Done!");
      });
  }

  render() {
    return (
      <div>
        <div className="admin pure-u-1-1 DashboardWidget">
          <p><strong>LumiBank Balance:</strong> {this.state.balance} ETH</p>
          <p><strong>LumiBank Owner:</strong> {this.state.bank}</p>
          <p><strong>LumiBank Borrower:</strong> {this.state.borrower}</p>
          <p><strong>Contract Signed: </strong>{this.state.signed}</p>
	      </div>
        <div className="admin pure-u-5-12 DashboardWidget">
          <h4>1. BANK: Put some funds in the Lumibank</h4>
          <a className="pure-button pure-button-primary" onClick={this.fundLumibank}>Put 20ETH in Lumibank</a>
        </div>
        <div className="pure-u-1-12"/>
        <div className="admin pure-u-5-12 DashboardWidget">
          <h4>2. BANK: Setup a new contract</h4>
          <a className="pure-button pure-button-primary" onClick={this.setupContract}>Setup Contract</a>
        </div>
        <div className="admin pure-u-5-12 DashboardWidget">
          <h4>3. BANK: Approve borrower for a new credit line</h4>
          <input type="text" placeholder="Borrower Address" onChange={this.updateBorrowerAddress}/>{' '}
          <a className="pure-button pure-button-primary" onClick={this.approveBorrower}>Approve new Borrower</a>
        </div>
        <div className="pure-u-1-12"/>
        <div className="admin pure-u-5-12 DashboardWidget">
          <h4>4. BORROWER: Sign contract</h4>
          <a className="pure-button pure-button-primary" onClick={this.signContract}>Sign Contract</a>
        </div>
        <div className="admin pure-u-5-12 DashboardWidget">
          <h4>5. BANK: Calculate Interest</h4>
          <a className="pure-button pure-button-primary" onClick={this.calcInterest}>Calculate Interest</a>
        </div>
      </div>
    );
  };
}

export default Admin;
