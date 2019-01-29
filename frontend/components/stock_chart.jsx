import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, YAxis } from 'recharts';
import { getHistoricalStockData } from '../actions/stock_actions';

class StockChart extends React.Component {
  constructor(props) {
    super(props);

    this.chartColor = this.chartColor.bind(this);
    this.parseChartData = this.parseChartData.bind(this);
    this.oneDayChartData = this.oneDayChartData.bind(this);
    this.oneMonthChartData = this.oneMonthChartData.bind(this);
    this.threeMonthChartData = this.threeMonthChartData.bind(this);
    this.oneYearChartData = this.oneYearChartData.bind(this);
    this.fiveYearChartData = this.fiveYearChartData.bind(this);
  }


  componentDidMount() {
    this.props.getHistoricalStockData(this.props.stock.symbol, this.props.range);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.range !== this.props.range) {
      this.props.getHistoricalStockData(this.props.stock.symbol, this.props.range);
    }
  }



  
  parseChartData() {
    switch (this.props.range) {
      case "1D":
        return { data: this.oneDayChartData() };
      case "1M":
        return { data: this.oneMonthChartData() };
      case "3M":
        return { data: this.threeMonthChartData() };
      case "1Y":
        return { data: this.oneYearChartData() };
      case "5Y":
        return { data: this.fiveYearChartData() };
      default:
        return null;
    }
  }

  oneDayChartData() {
    // debugger
    const oneDayChartData = [];
    this.props.stock.chart.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.label).toString();
      dpObject['price'] = dataPoint.marketAverage;
      oneDayChartData.push(dpObject);
    }
    );
    return oneDayChartData;
  }

  oneMonthChartData() {
    // debugger
    if (!this.props.stock.historicalData) { return []; }
    const oneMonthChartData = [];
    this.props.stock.historicalData.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.label).toString();
      dpObject['price'] = dataPoint.close;
      oneMonthChartData.push(dpObject);
    }
    );
    return oneMonthChartData;
  }

  threeMonthChartData() {
    // debugger
    if (!this.props.stock.historicalData) { return []; }
    const threeMonthChartData = [];
    this.props.stock.historicalData.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.label).toString();
      dpObject['price'] = dataPoint.close;
      threeMonthChartData.push(dpObject);
    }
    );
    return threeMonthChartData;
  }

  oneYearChartData() {
    // debugger
    if (!this.props.stock.historicalData) { return []; }
    const oneYearChartData = [];
    this.props.stock.historicalData.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.label).toString();
      dpObject['price'] = dataPoint.close;
      oneYearChartData.push(dpObject);
    }
    );
    return oneYearChartData;
  }

  fiveYearChartData() {
    // debugger
    if (!this.props.stock.historicalData) { return []; }
    const fiveYearChartData = [];
    this.props.stock.historicalData.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.label).toString();
      dpObject['price'] = dataPoint.close;
      fiveYearChartData.push(dpObject);
    }
    );
    return fiveYearChartData;
  }

  chartColor() {
    if (this.props.stock.quote.change < 0) {
      return "#f45531";
    } else {
      return "#1ae9aa";
    }
  }


  render() {
    if (this.props.loading) { return (<h1>loading :)</h1>); };
    const companyName = this.props.stock.company.companyName;
    const currentPrice = this.props.stock.quote.latestPrice;
    const allData = this.parseChartData();
    const range = [this.props.stock.quote.low, this.props.stock.quote.high];
    const color = this.chartColor();
    return (
      <div className="dashboard-chart">
        <div className="chart-header-container-stock">
          <div className="chart-header-name-display">
            {companyName}
          </div>
          <div className="chart-header-price-value-stock-view">
            ${currentPrice}
          </div>
          <div className="chart-header-change-value-stock-page">
            +$420.69 (4.20%)
          </div>
        </div>
        <div className="chart-actual-chart">
          <LineChart width={675} height={200} data={allData.data}>
            <Line type="monotone" dataKey="price" stroke={color} dot={false} />
            <YAxis type="number" domain={range} hide={true} />
          </LineChart>
        </div>

      </div>
    );
  }
}

const msp = (state, ownProps) => {
  return {
    loading: state.ui.loading.historicalStockDataLoading,
    range: ownProps.dateRange
  };
};

const mdp = (dispatch) => {
  return {
    getHistoricalStockData: (symbol, period) => dispatch(getHistoricalStockData(symbol, period)),
  };
};

export default connect(msp, mdp)(StockChart)