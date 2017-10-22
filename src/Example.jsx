import React, { Component } from 'react';

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = props.state;
    this.componentWillMount = props.componentWillMount;
    this.instantiateContract = props.instantiateContract;
    console.dir(props.state);
  }

  render() {
    return (
      <div className="truffleExample">
        <h2>Smart Contract Example</h2>
        <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
        <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
        <p>The stored value is: {this.state.storageValue}</p>
      </div>
    );
  };
}

export default Example
