import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Offer from './Offer';

class AcceptOffer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offer: props.offer
    };
  }

  render() {
    return (
      <div className="acceptOffer">
        <Offer name={this.state.offer.name} terms={this.state.offer.terms} />
        <h2>Credit Check Application</h2>
        <form>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Income" />
          <input type="text" placeholder="SSN" />
          <Link to="/approved" className="pure-button pure-button-primary">Submit</Link>
        </form>
      </div>
    );
  };
}

export default AcceptOffer;
