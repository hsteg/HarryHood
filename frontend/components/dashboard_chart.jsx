import React from 'react';
import { connect } from 'react-redux';
import { getUserPortfolioSnapshots } from '../actions/session_actions';
import { LineChart, Line, YAxis, ReferenceLine, Tooltip, XAxis } from 'recharts';

class DashboardChart extends React.Component {
  constructor(props) {
    super(props);
    this.parseChartData = this.parseChartData.bind(this);
    this.greaterThanOneDayChartData = this.greaterThanOneDayChartData.bind(this);
    // this.chartColor = this.chartColor.bind(this);
  }

  parseChartData() {
    const { dateRange } = this.props;
    switch (dateRange) {
      case "1D":
        return { data: this.oneDayChartData(), width: 675, refColor: "gray" };
      case "1W":
        return { data: this.greaterThanOneDayChartData("1W"), width: 675, refColor: "transparent" };
      case "1M":
        return { data: this.greaterThanOneDayChartData("1M"), width: 675, refColor: "transparent" };
      case "3M":
        return { data: this.greaterThanOneDayChartData("3M"), width: 675, refColor: "transparent" };
      case "1Y":
        return { data: this.greaterThanOneDayChartData("1Y"), width: 675, refColor: "transparent" };
      case "ALL":
        return { data: this.greaterThanOneDayChartData("ALL"), width: 675, refColor: "transparent" };
      default:
        return null;
    }
  }

  greaterThanOneDayChartData() {
    if (!this.props.chartData) { return []; }
    const greaterThanOneDayChartData = [];
    this.props.chartData.forEach(dataPoint => {
      let dpObject = {};
      dpObject['Date'] = (dataPoint.date).toString();
      dpObject['Price'] = dataPoint.total_portfolio_value;
      greaterThanOneDayChartData.push(dpObject);
    }
    );
    return greaterThanOneDayChartData;
  }

  // chartColor(range) {
  //   let first, last;
  //   switch (range) {
  //     case "1D":
  //       return "blue";
  //     case "1W":
  //     case "1M":
  //     case "3M":
  //     case "1Y":
  //     case "5Y":
  //       first = this.props.stock.historicalData[0].close;
  //       last = this.props.stock.historicalData.slice(-1)[0].close;
  //       return (first <= last) ? ("#21ce99") : ("#f45531");
  //     default:
  //       return null;
  //   }
  // }

  render() {
    if(this.props.loading.userPortfolioDataLoading) {return (<img className="right-col-loading-img" src={window.loadingIMG} />); };
    const lastDataPoint = this.props.chartData[this.props.chartData.length-1].total_portfolio_value
    
    const allData = this.parseChartData();
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
        <LineChart width={675} height={190} data={allData.data}>
            <Line type="monotone" dataKey="Price" stroke="blue" dot={false} strokeWidth={1.5}   />
            <XAxis dataKey="Date" hide={true} />
            <YAxis type="number" domain="[20000, 60000]" hide={true} />
            <Tooltip contentStyle={{ backgroundColor: 'transparent', border: '0' }} />
          </LineChart>
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