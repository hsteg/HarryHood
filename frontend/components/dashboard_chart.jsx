import React from 'react';
import { connect } from 'react-redux';

class DashboardChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard-chart">
        <div className="dashboard-chart-header-container">
          <div className="dashboard-chart-header-portfolio-value">
            $23,951.37
          </div>
          <div className="dashboard-chart-header-change-container">
            +$420.69 (4.20%) 
          </div>
        </div>
        <div className="dashboard-actual-chart">
          chart here
        </div>
        <nav className="dashboard-chart-timeline-selector">
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

export default connect(msp, mdp)(DashboardChart)