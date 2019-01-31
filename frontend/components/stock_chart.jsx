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
    this.greaterThanOneWeekChartData = this.greaterThanOneWeekChartData.bind(this);
    this.oneWeekChartData = this.oneWeekChartData.bind(this);
    this.widthSelector = this.widthSelector.bind(this);
  }


  componentDidMount() {
    this.props.getHistoricalStockData(this.props.stock.symbol, this.props.range);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.range !== this.props.range) {
      if (this.props.range === "1W") {
        this.props.getHistoricalStockData(this.props.stock.symbol, "1M");
      } else {
        this.props.getHistoricalStockData(this.props.stock.symbol, this.props.range);
      }
    }
  }

  parseChartData() {
    const { range } = this.props;
    switch (range) {
      case "1D":
        return { data: this.oneDayChartData(), color: this.chartColor(range), width: this.widthSelector(range), refColor: "gray" };
      case "1W":
        return { data: this.oneWeekChartData(), color: this.chartColor(range), width: this.widthSelector(range), refColor: "transparent" };
      case "1M":
        return { data: this.greaterThanOneWeekChartData(), color: this.chartColor(range), width: this.widthSelector(range), refColor: "transparent" };
      case "3M":
        return { data: this.greaterThanOneWeekChartData(), color: this.chartColor(range), width: this.widthSelector(range), refColor: "transparent" };
      case "1Y":
        return { data: this.greaterThanOneWeekChartData(), color: this.chartColor(range), width: this.widthSelector(range), refColor: "transparent" };
      case "5Y":
        return { data: this.greaterThanOneWeekChartData(), color: this.chartColor(range), width: this.widthSelector(range), refColor: "transparent" };
      default:
        return null;
    }
  }

  oneDayChartData() {
    const oneDayChartData = [];
    this.props.stock.chart.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.label).toString();
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

  oneWeekChartData() {
    if (!this.props.stock.historicalData) { return []; }
    const oneWeekChartData = [];
    this.props.stock.historicalData.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.label).toString();
      dpObject['Price'] = dataPoint.close;
      oneWeekChartData.push(dpObject);
    }
    );
    oneWeekChartData.push({ 'time': "most recent", 'Price': this.props.stock.quote.latestPrice });
    return oneWeekChartData.slice(-5);
  }

  greaterThanOneWeekChartData() {
    if (!this.props.stock.historicalData) { return []; }
    const greaterThanOneWeekChartData = [];
    this.props.stock.historicalData.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.label).toString();
      dpObject['Price'] = dataPoint.close;
      greaterThanOneWeekChartData.push(dpObject);
    }
    );
    return greaterThanOneWeekChartData;
  }

  chartColor(range) {
    const { previousClose, latestPrice } = this.props.stock.quote;
    let first, last;
    switch (range) {
      case "1D":
        return (previousClose <= latestPrice) ? ("#21ce99") : ("#f45531");
      case "1W":
        first = this.props.stock.historicalData.slice(-4)[0].close;
        last = latestPrice;
        return (first <= last) ? ("#21ce99") : ("#f45531");
      case "1M":
      case "3M":
      case "1Y":
      case "5Y":
        first = this.props.stock.historicalData[0].close;
        last = this.props.stock.historicalData.slice(-1)[0].close;
        return (first <= last) ? ("#21ce99") : ("#f45531");
      default:
        return null;
    }
  }

  widthSelector(range) {
    switch(range) {
      case "1D": 
        return (((this.props.stock.chart.length) / 78) * 675);
      default: 
        return 675;
    }
  }

  // rangeSelector(range) {
  //   const { low, high } = this.props.stock.quote;
  //   switch(range) {
  //     case "1D":
  //       return [low, high];
  //     case "1W":

  //     case "1M":
  //     case "3M":
  //     case "1Y":
  //     case "5Y":

  //     default: 
  //       return null;
  //   }
  // }

  render() {
    if (this.props.loading) { return (<h1>loading :)</h1>); };
    const companyName = this.props.stock.company.companyName;
    const currentPrice = this.props.stock.quote.latestPrice;
    const allData = this.parseChartData();
    const range = this.props.stock.quote.latestPrice > this.props.stock.quote.previousClose ? [this.props.stock.quote.previousClose, this.props.stock.quote.high] : [this.props.stock.quote.low, this.props.stock.quote.previousClose];
    
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
            +$420.69 (4.20%)
          </div>
        </div>
        <div className="chart-actual-chart">
          <LineChart width={allData.width} height={190} data={allData.data}>
            <Line type="monotone" dataKey="Price" stroke={allData.color} dot={false} strokeWidth={1.5}   />
            <XAxis dataKey="time" hide={true} />
            <YAxis type="number" domain={range} hide={true} />
            <Tooltip contentStyle={{ backgroundColor: 'transparent', border: '0' }} />
            <ReferenceLine y={this.props.stock.quote.previousClose} strokeDasharray="1 6" stroke={allData.refColor} isFront={false}/>
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