import React from 'react';
import { connect } from 'react-redux';
import { getUserPortfolioSnapshots } from '../actions/session_actions';

class DashboardChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserPortfolioSnapshots(this.props.currentUser.id)
  }

  render() {
    if(this.props.loading.userPortfolioDataLoading) {return (<img className="right-col-loading-img" src={window.loadingIMG} />); };
    return (
      <div className="dashboard-chart">
        <div className="chart-header-container">
          <div className="chart-header-price-value">
            $23,951.37
          </div>
          <div className="chart-header-change-value">
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
    loading: state.ui.loading,
  };
};

const mdp = (dispatch) => {
  return {
    getUserPortfolioSnapshots: (userId) => dispatch(getUserPortfolioSnapshots(userId))
  };
};

export default connect(msp, mdp)(DashboardChart)