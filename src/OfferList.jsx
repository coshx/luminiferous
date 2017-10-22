import React, { Component } from 'react';
import Offer from './Offer';

class OfferList extends Component {

  constructor(props) {
    super(props);
    this.state = { offers: props.offers };
  }

  componentWillMount() {
    console.dir(process.env);
    console.log('ID: ' + process.env.CAPITALONE_CLIENT_ID);
    fetch('https://api-sandbox.capitalone.com/oauth2/token',
          {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'client_id=' + process.env.CAPITALONE_CLIENT_ID
              + '&client_secret=' + process.env.CAPITALONE_CLIENT_SECRET
          })
      .then( (data) => {
        console.log("Got token!");
        console.dir(data);
      })
      .catch( (err) => {
        console.log("Error fetching auth token", err);
      });
  }

  render() {
    var offersList = this.state.offers.map( (offer) => {
      return <Offer name={offer.name} terms={offer.terms} key={offer.id} id={offer.id}/>;
    });
    return ( <div className="offerList">{offersList}</div> );
  }
}

export default OfferList;
