import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Report from './Report';
class Approved extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="approved">
        <h2>Application Approved!</h2>
        <Report />
      </div>
    );
  };
}

export default Approved;
