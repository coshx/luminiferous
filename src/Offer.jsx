import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Offer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: props.details
    };
  }

  render() {
    return (
      <div className="offer">
        <h2>{this.state.details.productDisplayName}</h2>
        <img src={this.state.details.images[0].url}/>
        <p>{this.state.details.code}</p>
        <p>{this.state.details.marketingCopy[0]}</p>
        <Link to={this.state.details.additionalInformationUrl}
              className="pure-button pure-button-primary">More Information</Link>
        <Link to="/" className="pure-button pure-button-primary">Apply Now</Link>
      </div>
    );
  };
}

export default Offer;
