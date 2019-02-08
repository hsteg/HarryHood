import React from 'react';
import { connect } from 'react-redux';
import { getDashboardNews } from '../actions/stock_actions';

class DashboardNewslist extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getDashboardNews(this.props.stocks);
  }

  render() {
    if(this.props.loading) { return (<img className="right-col-loading-img" src={window.loadingIMG} />); };
    return(
      <div></div>
    );
  }
}

const msp = (state) => {
  return {
    loading: state.ui.loading.dashboardNewsLoading,
  };
};

const mdp = (dispatch) => {
  return {
    getDashboardNews: (stocks) => dispatch(getDashboardNews(stocks));
  };
};

export default connect(null, null)(DashboardNewslist);