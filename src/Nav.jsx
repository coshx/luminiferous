import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {showMenu: false};
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    var w = Math.max(
      document.documentElement["clientWidth"],
      document.body["scrollWidth"],
      document.documentElement["scrollWidth"],
      document.body["offsetWidth"],
      document.documentElement["offsetWidth"]
    );
    var sm = w <= 480;
    this.setState({showMenu: !sm});
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  toggleHamburger() {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  render() {
    return (
      <div className="menu">
        <button className="hamburgerMenu fa fa-bars button pure-button-primary"
                onClick={this.toggleHamburger.bind(this)} />
        <nav className="navbar pure-menu"
             style={this.state.showMenu ? {} : {display: 'none'}}>
          <ul className="pure-menu-list">
            <li><Link to="/">Luminiferous</Link> {' '}</li>
            <li><Link to="/report">My Report</Link> {' '}</li>
            <li><Link to="/tx">Transaction</Link> {' '}</li>
            <li><Link to="/example/">Test Truffle</Link></li>
          </ul>
        </nav>
      </div>
    );
  };
}

export default Nav
