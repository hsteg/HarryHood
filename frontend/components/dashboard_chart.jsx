import React from 'react';
import { connect } from 'react-redux';
import { getUserPortfolioSnapshots } from '../actions/session_actions';

class DashboardChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.loading.userPortfolioDataLoading) {return (<img className="right-col-loading-img" src={window.loadingIMG} />); };
    
    const lastDataPoint = this.props.chartData[this.props.chartData.length-1].total_portfolio_value
    return (
      <div className="dashboard-chart">
        <div className="chart-header-container">
          <div className="chart-header-price-value">
            <h1>${lastDataPoint}</h1>
          </div>
          <div className="chart-header-change-value">
            +$420.69 (4.20%) 
          </div>
        </div>
        <div className="chart-actual-chart">
          chart here
        </div>
      </div>
    );
  }
}

const msp = (state) => {
  return {
    loading: state.ui.loading,
    chartData: state.session.portfolioSnapshots
  };
};

const mdp = (dispatch) => {
  return {
    getUserPortfolioSnapshots: (userId) => dispatch(getUserPortfolioSnapshots(userId))
  };
};

export default connect(msp, mdp)(DashboardChart)