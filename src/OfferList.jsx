import React, { Component } from 'react';
import Offer from './Offer';

class OfferList extends Component {

  constructor(props) {
    super(props);
    this.state = { offers: props.offers };
  }

  render() {
    var offersList = this.state.offers.map( (offer) => {
      return <Offer name={offer.name} terms={offer.terms} key={offer.id} id={offer.id}/>;
    });
    return ( <div className="offerList">{offersList}</div> );
  }
}

export default OfferList;
