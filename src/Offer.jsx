import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Offer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      terms: props.terms,
      name: props.name,
      offer_id: props.id,
      accept_link: '/offers/' + props.id + '/accept'
    };
  }

  render() {
    return (
      <div className="offer">
        <h2>{this.state.name}</h2>
        <table>
          <thead>
          <tr>
            <th>APR</th>
            <th>Limit</th>
            <th>Balance Transfers</th>
            <th>Annual Fee</th>
            <th>Credit Required</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{this.state.terms.apr}</td>
            <td>${this.state.terms.limit}</td>
            <td>{this.state.terms.balance_transfers ? "Yes" : "No"}</td>
            <td>${this.state.terms.annual_fee_first_year} (First Year)<br/>
                ${this.state.terms.annual_fee_subsequent_years} (Subsequent Years)
            </td>
            <td>{this.state.terms.credit_required}</td>
          </tr>
          </tbody>
        </table>
        <Link to={this.state.accept_link} className="pure-button pure-button-primary">Apply Now</Link>
      </div>
    );
  };
}

export default Offer;
