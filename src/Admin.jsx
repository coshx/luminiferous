import React from 'react';
import { Link } from 'react-router-dom';
import LumiComponent from './LumiComponent';
import Luminiferous from '../build/contracts/Luminiferous.json';
import LuminiferousBank from '../build/contracts/LuminiferousBank.json';

class Admin extends LumiComponent {

  constructor(props) {
    super(props);

    this.state.borrowerAddress = '';
    this.signContract = this.signContract.bind(this);
    this.updateBorrowerAddress = this.updateBorrowerAddress.bind(this);
    this.setupContract = this.setupContract.bind(this);
    this.approveBorrower = this.approveBorrower.bind(this);
    this.fundLumibank = this.fundLumibank.bind(this);
    this.calcInterest = this.calcInterest.bind(this);
  }

  lumiInit() {
    console.log
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
        <div className="admin">
          <h3>BANK: Put some funds in the Lumibank</h3>
          <div><button className="pure-button pure-button-primary" onClick={this.fundLumibank}>Put 20ETH in Lumibank</button></div>
        </div>
        <div className="admin">
          <h3>BANK: Setup a new contract</h3>
          <div><button className="pure-button pure-button-primary" onClick={this.setupContract}>Setup Contract</button></div>
        </div>
        <div className="admin">
          <h3>BANK: Approve borrower for a new credt line</h3>
          <div><input type="text" placeholder="Borrower Address" onChange={this.updateBorrowerAddress}/></div>
          <div><button className="pure-button pure-button-primary" onClick={this.approveBorrower}>Approve new Borrower</button></div>
        </div>
        <div className="admin">
          <h3>BORROWER: Sign contract</h3>
          <div><button className="pure-button pure-button-primary" onClick={this.signContract}>Sign Contract</button></div>
        </div>
        <div className="admin">
          <h3>BANK: Calculate Interest</h3>
          <div><button className="pure-button pure-button-primary" onClick={this.calcInterest}>Calculate Interest</button></div>
        </div>
      </div>
    );
  };
}

export default Admin;
