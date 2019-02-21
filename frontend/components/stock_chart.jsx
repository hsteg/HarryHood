import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, YAxis, ReferenceLine, Tooltip, XAxis } from 'recharts';
import { getHistoricalStockData } from '../actions/stock_actions';

class StockChart extends React.Component {
  constructor(props) {
    super(props);

    this.chartColor = this.chartColor.bind(this);
    this.parseChartData = this.parseChartData.bind(this);
    this.oneDayChartData = this.oneDayChartData.bind(this);
    this.greaterThanOneDayChartData = this.greaterThanOneDayChartData.bind(this);
    this.priceChange = this.priceChange.bind(this);
    this.percentChange = this.percentChange.bind(this);
    this.rangeSelector = this.rangeSelector.bind(this);
  }

  parseChartData() {
    const { range } = this.props;
    let chartData;
    switch (range) {
      case "1D":
        chartData = this.oneDayChartData();
        return {
          data: chartData,
          color: this.chartColor(chartData),
          width: ((chartData.length / 390) * 675),
          range: this.rangeSelector(chartData),
          priceChange: this.priceChange(chartData),
          percentChange: this.percentChange(chartData),
          refColor: "gray"
        };
      case "1W":
        chartData = this.greaterThanOneDayChartData(4);
        return {
          data: chartData,
          color: this.chartColor(chartData),
          range: this.rangeSelector(chartData),
          priceChange: this.priceChange(chartData),
          percentChange: this.percentChange(chartData),
          width: 675,
          refColor: "transparent"
        };
      case "1M":
        chartData = this.greaterThanOneDayChartData(22);
        return {
          data: chartData,
          color: this.chartColor(chartData),
          range: this.rangeSelector(chartData),
          priceChange: this.priceChange(chartData),
          percentChange: this.percentChange(chartData),
          width: 675,
          refColor: "transparent"
        };
      case "3M":
        chartData = this.greaterThanOneDayChartData(66);
        return {
          data: chartData,
          color: this.chartColor(chartData),
          range: this.rangeSelector(chartData),
          priceChange: this.priceChange(chartData),
          percentChange: this.percentChange(chartData),
          width: 675,
          refColor: "transparent"
        };
      case "1Y":
        chartData = this.greaterThanOneDayChartData(264);
        return {
          data: chartData,
          color: this.chartColor(chartData),
          range: this.rangeSelector(chartData),
          priceChange: this.priceChange(chartData),
          percentChange: this.percentChange(chartData),
          width: 675,
          refColor: "transparent"
        };
      case "5Y":
        chartData = this.greaterThanOneDayChartData(1258);
        return {
          data: chartData,
          color: this.chartColor(chartData),
          range: this.rangeSelector(chartData),
          priceChange: this.priceChange(chartData),
          percentChange: this.percentChange(chartData),
          width: 675,
          refColor: "transparent"
        };
      default:
        return null;
    }
  }

  oneDayChartData() {
    const oneDayChartData = [];
    this.props.stock.chart.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.label);
      dpObject['Price'] = dataPoint.close;

      if (dpObject.Price === null) { return }
      oneDayChartData.push(dpObject);
    }
    );
    let latestPrice = {};
    latestPrice['time'] = this.props.stock.quote.latestTime;
    latestPrice['Price'] = this.props.stock.quote.latestPrice;
    oneDayChartData.push(latestPrice);
    return oneDayChartData;
  }

  greaterThanOneDayChartData(length) {
    if (!this.props.stock.historicalData) { return []; }
    const { stock } = this.props;
    const greaterThanOneDayChartData = [];
    let chartData;

    let totalDataLength = stock.historicalData.length;
    if (totalDataLength < length) {
      chartData = stock.historicalData;
    } else {
      chartData = stock.historicalData.slice(totalDataLength - length);
    }

    chartData.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.date).toString();
      dpObject['Price'] = dataPoint.close;
      greaterThanOneDayChartData.push(dpObject);
    }
    );

    if (length === 4) {
      greaterThanOneDayChartData.push({ 'time': "most recent", 'Price': this.props.stock.quote.latestPrice });
    }
    return greaterThanOneDayChartData;
  }

  chartColor(data) {
    let first, last;

    first = data[0]["Price"];
    last = data[data.length - 1]["Price"];
    return (first <= last) ? ("#21ce99") : ("#f45531");
  }

  priceChange(data) {
    let first, last;
    first = data[0]['Price'];
    last = data[data.length - 1]['Price'];
    if (last - first > 0) {
      return `+$${(last - first).toFixed(2)}`;
    } else {
      return `-$${((last - first) * -1).toFixed(2)}`;
    }
  }

  percentChange(data) {
    let first, last;
    first = data[0]['Price'];
    last = data[data.length - 1]['Price'];
    if (last - first > 0) {
      return `(${(((last - first) / last) * 100).toFixed(2)}%)`;
    } else {
      return `(-${((((last - first) / last) * 100) * -1).toFixed(2)}%)`;
    }
  }

  rangeSelector(data) {
    let values = data.map(dataPoint => parseFloat(dataPoint['Price']));
    let min = Math.min(...values)
    let max = Math.max(...values)

    return [min, max];
  }

  render() {
    if (this.props.loading || this.props.stock === {} || !this.props.stock.historicalData || !this.props.stock.quote) { return (<img className="left-col-loading-img" src={window.loadingIMG} />); };
    const companyName = this.props.stock.company.companyName;
    const currentPrice = this.props.stock.quote.latestPrice;
    const allData = this.parseChartData();

    return (
      <div className="dashboard-chart">
        <div className="chart-header-container-stock">
          <div className="chart-header-name-display">
            {companyName}
          </div>
          <div className="chart-header-price-value-stock-view">
            ${currentPrice.toFixed(2)}
          </div>
          <div className="chart-header-change-value-stock-page">
            {allData.priceChange}  {allData.percentChange}
          </div>
        </div>
        <div className="chart-actual-chart">
          <LineChart width={allData.width} height={190} data={allData.data}>
            <Line type="monotone" dataKey="Price" stroke={allData.color} dot={false} strokeWidth={1.5} />
            <XAxis dataKey="time" hide={true} />
            <YAxis type="number" domain={allData.range} hide={true} />
            <Tooltip contentStyle={{ backgroundColor: 'transparent', border: '0' }} />
            <ReferenceLine y={this.props.stock.quote.previousClose} strokeDasharray="1 6" stroke={allData.refColor} isFront={false} />
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