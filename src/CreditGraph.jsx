import React from 'react';
import LumiComponent from './LumiComponent';

class CreditGraph extends LumiComponent {

  lumiInit() {
  }

  render() {
    return (
      <div className="CreditGraph DashboardWidget pure-u-7-12">
        <img src="credit-graph-mock.png" />
      </div>
    );
  };
}

export default CreditGraph;
