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
        <h2>Check My Credit Report</h2>
        <Link className="pure-button pure-button-primary" to="/report">Get Report</Link>
        <h2>Check Someone Else's Credit Report</h2>
      </div>
    );
  };
}

export default Home
