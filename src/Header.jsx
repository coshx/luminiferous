import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="pure-u-1-6" />
        <img src="logo.png" className="logo pure-u-1-6" />
        <div className="pure-u-1-2" />
        <img src="profile_image.png" style={{width: "60px"}} className="profile pure-u-1-12" />
        <div className="pure-u-1-12" />
      </div>
    );
  };
}

export default Header;
