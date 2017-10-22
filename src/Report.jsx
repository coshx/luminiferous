import React from 'react';
import { Link } from 'react-router-dom';
import LumiComponent from './LumiComponent';

class Report extends LumiComponent {

  constructor(props) {
    super(props);
    this.state.ethBalance = 0;
    this.state.signed = false;
    this.signContract = this.signContract.bind(this);
  }

  updateBalance() {
    var that = this;
    this.state.web3.eth.getBalance(that.state.account, (err, bal) => {
      var ethBal = that.state.web3.fromWei(bal, 'ether').toNumber();
      that.setState({ethBalance: ethBal});
    });
  }

  updateSigned() {
    this.state.lumi.isSigned.call({from: this.state.account})
      .then( (err, signed) => {
        this.setState({signed: signed});
      })
      .catch( (err) => {
        console.log("Exception in isSigned()", err);
      });
  }

  lumiInit() {
    this.updateBalance();
    this.updateSigned();
  }

  signContract(event) {
    if (event.target.value) {
      this.state.lumi.sign_contract.sendTransaction({from: this.state.account})
        .then( () => {
          setTimeout(this.updateSigned, 5000);
        });
    }
  }

  render() {
    return (
      <div className="report">
        <h1>My Credit Report</h1>
        <p>Current ETH Balance: {this.state.ethBalance}</p>
        <label>
          Signed Contract:
          <input type="checkbox" checked={this.state.signed} onChange={this.signContract} />
        </label>
        <br/>
        <br/>
        <Link to="/tx" className="pure-button pure-button-primary">Make a Payment</Link>
      </div>
    );
  };
}

export default Report;
