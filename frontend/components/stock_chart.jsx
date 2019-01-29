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
    this.oneAndThreeMonthChartData = this.oneAndThreeMonthChartData.bind(this);
    this.oneAndFiveYearChartData = this.oneAndFiveYearChartData.bind(this);
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
        return { data: this.oneAndThreeMonthChartData() };
      case "3M":
        return { data: this.oneAndThreeMonthChartData() };
      case "1Y":
        return { data: this.oneAndFiveYearChartData() };
      case "5Y":
        return { data: this.oneAndFiveYearChartData() };
      default:
        return null;
    }
  }

  oneDayChartData() {
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

  oneAndThreeMonthChartData() {
    if (!this.props.stock.historicalData) { return []; }
    const oneAndThreeMonthChartData = [];
    this.props.stock.historicalData.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.label).toString();
      dpObject['price'] = dataPoint.close;
      oneAndThreeMonthChartData.push(dpObject);
    }
    );
    return oneAndThreeMonthChartData;
  }

  oneAndFiveYearChartData() {
    if (!this.props.stock.historicalData) { return []; }
    const oneAndFiveYearChartData = [];
    this.props.stock.historicalData.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.label).toString();
      dpObject['price'] = dataPoint.close;
      oneAndFiveYearChartData.push(dpObject);
    }
    );
    return oneAndFiveYearChartData;
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