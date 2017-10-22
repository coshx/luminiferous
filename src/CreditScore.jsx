import React from 'react';
import LumiComponent from './LumiComponent';

class CreditScore extends LumiComponent {

  lumiInit() {
  }

  render() {
    return (
      <div className="CreditScore pure-u-1-3">
        <img src="credit-score-mock.png" />
      </div>
    );
  };
}

export default CreditScore;
