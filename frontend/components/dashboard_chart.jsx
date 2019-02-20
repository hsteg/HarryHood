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

    this.state = {
      oneDayChartData: [],
    }
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
          // color: this.chartColor(chartData),
          range: null,
          width: (((chartData.length) / 390) * 675),
          dataKey: "Time",
          refColor: "transparent",
          change: this.priceChange(1),
          percentChange: this.percentChange(1)
        };
      case "1W":
        chartData = this.greaterThanOneDayChartData(5);
        return {
          data: chartData,
          // color: this.chartColor(chartData), 
          range: null,
          width: 675,
          dataKey: "Date",
          refColor: "transparent",
          change: this.priceChange(5),
          percentChange: this.percentChange(5)
        };
      case "1M":
        chartData = this.greaterThanOneDayChartData(22);
        return {
          data: chartData,
          // color: this.chartColor(chartData), 
          range: null,
          width: 675,
          dataKey: "Date",
          refColor: "transparent",
          change: this.priceChange(22),
          percentChange: this.percentChange(22)
        };
      case "3M":
        chartData = this.greaterThanOneDayChartData(66);
        return {
          data: chartData,
          // color: this.chartColor(chartData), 
          range: null,
          width: 675,
          dataKey: "Date",
          refColor: "transparent",
          change: this.priceChange(66),
          percentChange: this.percentChange(66)
        };
      case "1Y":
        chartData = this.greaterThanOneDayChartData(264);
        return {
          data: chartData,
          // color: this.chartColor(chartData), 
          range: null,
          width: 675,
          dataKey: "Date",
          refColor: "transparent",
          change: this.priceChange(264),
          percentChange: this.percentChange(264)
        };
      case "ALL":
        chartData = this.greaterThanOneDayChartData(1258);
        return {
          data: chartData,
          // color: this.chartColor(chartData), 
          range: null,
          width: 675,
          dataKey: "Date",
          refColor: "transparent",
          change: this.priceChange(this.props.chartData.length),
          percentChange: this.percentChange(this.props.chartData.length)
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
        dpObject['Time'] = '';
        dpObject['Value'] = 0;
        let lastValidPrice = stocks[stockKey].quote.latestPrice;

        if(i >= chartData.length) {
          continue;
        }

        dpObject['Time'] = chartData[i].date;
        
        if (!chartData[i].close || chartData[i].close === null) {
          dpObject['Value'] += (lastValidPrice * userHeldStocks[stockKey].num_shares);
        } else {
          dpObject['Value'] += (chartData[i].close * userHeldStocks[stockKey].num_shares);
        }

        if(!(chartData[i].date in holdingObject)) {
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

  chartColor(range) {
    let first, last, beginningIdx;

    if (Array.isArray(range)) {
      first = range[0]["Value"];
      last = range[range.length - 1]["Value"];
      return (first <= last) ? ("#21ce99") : ("#f45531");
    }

    last = this.props.chartData[this.props.chartData.length - 1].total_portfolio_value;
    beginningIdx = this.props.chartData.length - range;

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
      return `+$${(last - first).toFixed(2)}`;
    } else {
      return `-$${((last - first) * -1).toFixed(2)}`;
    }
  }

  percentChange(length) {
    let first;
    let last = this.props.chartData[this.props.chartData.length - 1].total_portfolio_value;
    let beginningIdx = this.props.chartData.length - length;

    if (beginningIdx < 0) {
      first = this.props.chartData[0].total_portfolio_value;
    } else {
      first = this.props.chartData[beginningIdx].total_portfolio_value;
    }

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