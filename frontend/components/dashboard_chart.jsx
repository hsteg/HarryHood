import React from 'react';
import { connect } from 'react-redux';
import { getUserPortfolioSnapshots } from '../actions/session_actions';
import { getDashboardChartData } from '../actions/stock_actions';
import { LineChart, Line, YAxis, ReferenceLine, Tooltip, XAxis } from 'recharts';


class DashboardChart extends React.Component {
  constructor(props) {
    super(props);
    this.parseChartData = this.parseChartData.bind(this);
    this.greaterThanOneDayChartData = this.greaterThanOneDayChartData.bind(this);
    this.chartColor = this.chartColor.bind(this);
    this.chartRange = this.chartRange.bind(this);
    this.priceChange = this.priceChange.bind(this);
    this.percentChange = this.percentChange.bind(this);
    this.oneDayChartData = this.oneDayChartData.bind(this);
  }

  componentDidMount() {
    this.props.getDashboardChartData(this.props.stocks);
  }

  parseChartData() {
    const { dateRange } = this.props;
    let chartData;
    switch (dateRange) {
      case "1D":
        chartData = this.oneDayChartData();
        return {
          data: chartData,
          color: this.chartColor(chartData),
          range: this.chartRange(chartData),
          width: (((chartData.length) / 390) * 675),
          dataKey: "Time",
          refColor: "transparent",
          change: this.priceChange(chartData),
          percentChange: this.percentChange(chartData),
        };
      case "1W":
        chartData = this.greaterThanOneDayChartData(5);
        return {
          data: chartData,
          color: this.chartColor(chartData),
          range: this.chartRange(chartData),
          width: 675,
          dataKey: "Date",
          refColor: "transparent",
          change: this.priceChange(chartData),
          percentChange: this.percentChange(chartData),
        };
      case "1M":
        chartData = this.greaterThanOneDayChartData(22);
        return {
          data: chartData,
          color: this.chartColor(chartData),
          range: this.chartRange(chartData),
          width: 675,
          dataKey: "Date",
          refColor: "transparent",
          change: this.priceChange(chartData),
          percentChange: this.percentChange(chartData),
        };
      case "3M":
        chartData = this.greaterThanOneDayChartData(66);
        return {
          data: chartData,
          color: this.chartColor(chartData),
          range: this.chartRange(chartData),
          width: 675,
          dataKey: "Date",
          refColor: "transparent",
          change: this.priceChange(chartData),
          percentChange: this.percentChange(chartData),
        };
      case "1Y":
        chartData = this.greaterThanOneDayChartData(264);
        return {
          data: chartData,
          color: this.chartColor(chartData),
          range: this.chartRange(chartData),
          width: 675,
          dataKey: "Date",
          refColor: "transparent",
          change: this.priceChange(chartData),
          percentChange: this.percentChange(chartData),
        };
      case "5Y":
        chartData = this.greaterThanOneDayChartData(1258);
        return {
          data: chartData,
          color: this.chartColor(chartData),
          range: this.chartRange(chartData),
          width: 675,
          dataKey: "Date",
          refColor: "transparent",
          change: this.priceChange(chartData),
          percentChange: this.percentChange(chartData),
        };
      default:
        return null;
    }
  }

  oneDayChartData() {
    if (!this.props.stocks) { return []; }
    const { userHeldStocks, stocks } = this.props;
    const { cash_balance } = this.props.currentUser;
    const heldStockKeys = Object.keys(userHeldStocks);
    const oneDayChartData = [];
    
    const numDataPoints = stocks[heldStockKeys[0]].chart.length;

    for (let i = 0; i < numDataPoints; i++) {
      let dpObject = {};
      dpObject['Time'] = '';
      dpObject['Value'] = 0;
      let lastValidPrice;

      heldStockKeys.forEach(stockKey => {
        lastValidPrice = stocks[stockKey].quote.latestPrice;

        dpObject['Time'] = stocks[stockKey].chart[i].label;

        if (stocks[stockKey].chart[i].marketClose === null) {
          dpObject['Value'] += (lastValidPrice * userHeldStocks[stockKey].num_shares);
        } else {
          dpObject['Value'] += (stocks[stockKey].chart[i].marketClose * userHeldStocks[stockKey].num_shares);
        }
      });

      dpObject['Value'] += cash_balance;
      dpObject['Value'] = (dpObject['Value']).toFixed(2);
      oneDayChartData.push(dpObject);
    }
    
    return oneDayChartData;
  }

  greaterThanOneDayChartData(length) {
    if (!this.props.stocks) { return []; }
    const { userHeldStocks, stocks } = this.props;
    const { cash_balance } = this.props.currentUser;

    const heldStockKeys = Object.values(userHeldStocks).filter(stock => stock.num_shares > 0).map(stock => stock.stock_id.toString());
    if(heldStockKeys.length === 0) {return [{'Date': 0, 'Value': cash_balance}, {'Date': 1, 'Value': cash_balance}]; }
    const holdingObject = {};

    heldStockKeys.forEach(stockKey => {
      let chartData;
      let totalDataLength = stocks[stockKey].historicalData.length;
      if (totalDataLength < length) {
        chartData = stocks[stockKey].historicalData;
      } else {
        chartData = stocks[stockKey].historicalData.slice(totalDataLength - length);
      }

      for (let i = 0; i < length; i++) {
        let dpObject = {};
        dpObject['Date'] = '';
        dpObject['Value'] = 0;
        let lastValidPrice = stocks[stockKey].quote.latestPrice;

        if (i >= chartData.length) {
          continue;
        }

        dpObject['Date'] = chartData[i].date;

        if (!chartData[i].close || chartData[i].close === null) {
          dpObject['Value'] += (lastValidPrice * userHeldStocks[stockKey].num_shares);
        } else {
          dpObject['Value'] += (chartData[i].close * userHeldStocks[stockKey].num_shares);
        }

        if (!(chartData[i].date in holdingObject)) {
          holdingObject[chartData[i].date] = dpObject;
        } else {
          holdingObject[chartData[i].date]['Value'] += dpObject['Value'];
        }

      }
    });
    let chartArray = Object.values(holdingObject);
    chartArray.forEach(chartEl => chartEl['Value'] = ((chartEl['Value'] + cash_balance).toFixed(2)));
    return chartArray;
  }

  chartColor(data) {
    let first, last;
    
    first = data[0]["Value"];
    last = data[data.length - 1]["Value"];
    return (first <= last) ? ("#21ce99") : ("#f45531");
  }

  chartRange(data) {
    let values = data.map(dataPoint => parseFloat(dataPoint['Value']));
    let min = Math.min(...values)
    let max = Math.max(...values)

    return [min, max];
  }

  priceChange(data) {
    let first, last;
    first = data[0]['Value'];
    last = data[data.length - 1]['Value'];

    if (last - first > 0) {
      return `+$${(last - first).toFixed(2)}`;
    } else {
      return `-$${((last - first) * -1).toFixed(2)}`;
    }
  }

  percentChange(data) {
    let first, last;
    first = data[0]['Value'];
    last = data[data.length - 1]['Value'];

    if (last - first > 0) {
      return `(${(((last - first) / last) * 100).toFixed(2)}%)`;
    } else {
      return `(-${((((last - first) / last) * 100) * -1).toFixed(2)}%)`;
    }
  }

  render() {
    if (this.props.loading.userPortfolioDataLoading || this.props.loading.historicalStockDataLoading) { return (<img className="right-col-loading-img" src={window.loadingIMG} />); };

    const lastDataPoint = this.props.chartData[this.props.chartData.length - 1].total_portfolio_value

    const allData = this.parseChartData();
    return (
      <div className="dashboard-chart">
        <div className="chart-header-container">
          <div className="chart-header-price-value">
            <h1>${lastDataPoint}</h1>
          </div>
          <div className="chart-header-change-value">
            {allData.change} {allData.percentChange}
          </div>
        </div>
        <div className="chart-actual-chart">
          <LineChart width={allData.width} height={190} data={allData.data}>
            <Line type="monotone" dataKey="Value" stroke={allData.color} dot={false} strokeWidth={2} />
            <XAxis dataKey={allData.dataKey} hide={true} />
            <YAxis type="number" domain={allData.range} hide={true} />
            <Tooltip contentStyle={{ backgroundColor: 'transparent', border: '0' }} />
          </LineChart>
        </div>
      </div>
    );
  }
}

const msp = (state) => {
  const stockSymbols = Object.values(state.entities.stocks).map(stock => stock.symbol).join(',');
  return {
    loading: state.ui.loading,
    userHeldStocks: state.session.heldStocks,
    stockSymbols: stockSymbols,
    stocks: state.entities.stocks,
  };
};

const mdp = (dispatch) => {
  return {
    getUserPortfolioSnapshots: (userId) => dispatch(getUserPortfolioSnapshots(userId)),
    getDashboardChartData: (stocks) => dispatch(getDashboardChartData(stocks))
  };
};

export default connect(msp, mdp)(DashboardChart)