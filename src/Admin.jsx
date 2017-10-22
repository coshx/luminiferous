import React from 'react';
import { Link } from 'react-router-dom';
import LumiComponent from './LumiComponent';

class Admin extends LumiComponent {

  constructor(props) {
    super(props);

    this.state.borrowerAddress = '';
    this.signContract = this.signContract.bind(this);
    this.updateBorrowerAddress = this.updateBorrowerAddress.bind(this);
  }

  lumiInit() {
  }

  updateBorrowerAddress(event) {
    var val = event.target.value;
    this.state.borrowerAddress = val;
  }
  signContract(event) {
    event.preventDefault();
    console.log(this.state.borrowerAddress);
  }

  render() {
    return (
      <div className="admin">
        <input type="text" placeholder="Borrower Address" onChange={this.updateBorrowerAddress}/>
        <button className="pure-button pure-button-primary" onClick={this.signContract}>Sign Contract</button>
      </div>
    );
  };
}

export default Admin;
