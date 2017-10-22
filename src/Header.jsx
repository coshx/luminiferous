import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src="logo.png"/>
        <img src="profile_image.png"/>
      </div>
    );
  };
}

export default Header
