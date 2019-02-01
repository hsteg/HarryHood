import React from 'react';
import { connect } from 'react-redux';
import { getUserPortfolioSnapshots } from '../actions/session_actions';
import { LineChart, Line, YAxis, ReferenceLine, Tooltip, XAxis } from 'recharts';

class DashboardChart extends React.Component {
  constructor(props) {
    super(props);
    this.parseChartData = this.parseChartData.bind(this);
    this.greaterThanOneDayChartData = this.greaterThanOneDayChartData.bind(this);
    this.chartColor = this.chartColor.bind(this);
    this.chartRange = this.chartRange.bind(this);
    this.priceChange = this.priceChange.bind(this);
  }

  parseChartData() {
    const { dateRange } = this.props;
    switch (dateRange) {
      case "1D":
        return { data: this.oneDayChartData(), width: 675, refColor: "gray" };
      case "1W":
        return { data: this.greaterThanOneDayChartData(5), 
                color: this.chartColor(5), 
                range: this.chartRange(5),  
                width: 675, 
                refColor: "transparent" ,
                change: this.priceChange(5) };
      case "1M":
        return { data: this.greaterThanOneDayChartData(22), 
                color: this.chartColor(22), 
                range: this.chartRange(22), 
                width: 675, 
                refColor: "transparent",
                change: this.priceChange(22) };
      case "3M":
        return { data: this.greaterThanOneDayChartData(66), 
                color: this.chartColor(66), 
                range: this.chartRange(66), 
                width: 675, 
                refColor: "transparent",
                change: this.priceChange(66) };
      case "1Y":
        return { data: this.greaterThanOneDayChartData(264), 
                color: this.chartColor(264), 
                range: this.chartRange(264), 
                width: 675, 
                refColor: "transparent", 
                change: this.priceChange(264) };
      case "ALL":
        return { data: this.greaterThanOneDayChartData(this.props.chartData.length), 
                color: this.chartColor(this.props.chartData.length), 
                range: this.chartRange(this.props.chartData.length), 
                width: 675, 
                refColor: "transparent",
                change: this.priceChange(this.props.chartData.length) };
      default:
        return null;
    }
  }

  greaterThanOneDayChartData(length) {
    if (!this.props.chartData) { return []; }
    let beginningIdx = this.props.chartData.length - length;
    beginningIdx < 0 ? beginningIdx = 0 : beginningIdx;
    const chartData = this.props.chartData.slice(beginningIdx)
    const greaterThanOneDayChartData = [];
    chartData.forEach(dataPoint => {
      let dpObject = {};
      dpObject['Date'] = (dataPoint.date).toString();
      dpObject['Value'] = dataPoint.total_portfolio_value;
      greaterThanOneDayChartData.push(dpObject);
    }
    );
    return greaterThanOneDayChartData;
  }

  chartColor(length) {
    let first;
    let last = this.props.chartData[this.props.chartData.length - 1].total_portfolio_value;
    let beginningIdx = this.props.chartData.length - length;

    if (beginningIdx < 0) {
      first = this.props.chartData[0].total_portfolio_value;
    } else {
      first = this.props.chartData[beginningIdx].total_portfolio_value;
    }
    return (first <= last) ? ("#21ce99") : ("#f45531");
  }

  chartRange(length) {
    let first;
    let last = this.props.chartData[this.props.chartData.length - 1].total_portfolio_value;
    let beginningIdx = this.props.chartData.length - length;

    if (beginningIdx < 0) {
      first = this.props.chartData[0].total_portfolio_value;
    } else {
      first = this.props.chartData[beginningIdx].total_portfolio_value;
    }
    return [first, last];
  }

  priceChange(length) {
    let first;
    let last = this.props.chartData[this.props.chartData.length - 1].total_portfolio_value;
    let beginningIdx = this.props.chartData.length - length;
    
    if (beginningIdx < 0) {
      first = this.props.chartData[0].total_portfolio_value;
    } else {
      first = this.props.chartData[beginningIdx].total_portfolio_value;
    }
    
    if (last - first > 0) {
      return `+$${(last-first).toFixed(2)}`;
    } else {
      return `-$${((last-first) * -1).toFixed(2)}`;
    }
  }


  render() {
    if (this.props.loading.userPortfolioDataLoading) { return (<img className="right-col-loading-img" src={window.loadingIMG} />); };
    const lastDataPoint = this.props.chartData[this.props.chartData.length - 1].total_portfolio_value

    const allData = this.parseChartData();
    return (
      <div className="dashboard-chart">
        <div className="chart-header-container">
          <div className="chart-header-price-value">
            <h1>${lastDataPoint}</h1>
          </div>
          <div className="chart-header-change-value">
            {allData.change}
          </div>
        </div>
        <div className="chart-actual-chart">
          <LineChart width={allData.width} height={190} data={allData.data}>
            <Line type="monotone" dataKey="Value" stroke={allData.color} dot={false} strokeWidth={2} />
            <XAxis dataKey="Date" hide={true} />
            <YAxis type="number" domain={allData.range} hide={true} />
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
  };
};

const mdp = (dispatch) => {
  return {
    getUserPortfolioSnapshots: (userId) => dispatch(getUserPortfolioSnapshots(userId))
  };
};

export default connect(msp, mdp)(DashboardChart)