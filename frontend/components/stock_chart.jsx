import React from 'react';
import { connect } from 'react-redux';

class StockChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard-chart">
        <div className="chart-header-container-stock">
          <div className="chart-header-name-display">
            Stock Name
          </div>
          <div className="chart-header-price-value-stock-view">
            $23,951.37
          </div>
          <div className="chart-header-change-value-stock-page">
            +$420.69 (4.20%)
          </div>
        </div>
        <div className="chart-actual-chart">
          chart here
        </div>
        <nav className="chart-timeline-selector">
          1s 3d etc
        </nav>
      </div>
    );
  }
}

const msp = (state) => {
  return {

  };
};

const mdp = (dispatch) => {
  return {

  };
};

export default connect(msp, mdp)(StockChart)