import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1>Smart & Safe Credit Reports</h1>
        <p>Luminiferous takes the mystery out of credit reporting, both for consumers as well as lenders.</p>
        <Link className="pure-button pure-button-primary" to="/offers">Get a New Credit Card</Link> <br/><br/>
        <Link className="pure-button pure-button-primary" to="/report">Check Credit Report</Link><br/><br/>
      </div>
    );
  };
}

export default Home
