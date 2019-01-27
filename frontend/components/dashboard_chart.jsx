import React from 'react';
import { connect } from 'react-redux';

class DashboardChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard-chart">
        <div className="dashboard-content-graph-header-container">
          <div className="dashboard-content-graph-header-portfolio-value">
            porfolio value here
          </div>
          <div className="dashboard-content-graph-header-change-container">
            day change
          </div>
          <div className="dashboard-content-graph-header-change-container-afterhours">
            after hours change
          </div>
        </div>
        <div className="dashboard-content-graph">
          graph here
        </div>
        <nav className="dashboard-content-graph-timeline-selector">
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