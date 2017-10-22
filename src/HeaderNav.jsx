import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

class HeaderNav extends Component {
  constructor(props) {
    super(props);

    this.onLinkClick = this.onLinkClick.bind(this);
    this.state = {
      links: []
    };

    this.generateLinks();
  }

  onLinkClick(event) {
    this.generateLinks(event.target.pathname);
  }

  generateLinks(path) {
    var loc = path ? path : window.location.pathname;
    var links = [
      { path: "/", title: "My Lumin", key: 1, active: (loc == "" || loc == "/") },
      { path: "/offers", title: "Offers", key: 2, active: (loc == "/offers") }
    ];

    this.state.links = links;
  }

  render() {
    var linksList = this.state.links.map( (link) => {
      return <Link to={link.path} className={link.active ? "active" : ""} key={link.key} onClick={this.onLinkClick}>{link.title}</Link>;
    });

    return (
      <div className="menu">
        <h1 className="pure-u-1-2">Explore Your Credit</h1>
        <div className="pure-u-1-4"/>
        {linksList}
      </div>
    );
  };
}

export default HeaderNav;
