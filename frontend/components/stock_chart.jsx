import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, YAxis } from 'recharts';

class StockChart extends React.Component {
  constructor(props) {
    super(props);
    this.oneDayChartData = this.oneDayChartData.bind(this);
    this.chartColor = this.chartColor.bind(this);
  }

  oneDayChartData() {
    const chartData = [];
    this.props.stock.chart.forEach(dataPoint => 
      {
        let dpObject = {};
        dpObject['time'] = (dataPoint.label).toString();
        dpObject['price'] = dataPoint.marketAverage; 
        chartData.push(dpObject);
      }
    );
    return chartData;
  }

  chartColor() {
    if (this.props.stock.quote.change < 0) {
      return "#f45531";
    } else {
        return "#1ae9aa";
      }
  }


  render() {
    const companyName = this.props.stock.company.companyName;
    const currentPrice = this.props.stock.quote.latestPrice;
    const chartData = this.oneDayChartData();
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
          <LineChart width={675} height={200} data={chartData}>
            <Line type="monotone" dataKey="price" stroke={color} dot={false} />
            <YAxis type="number" domain={range} hide={true}/>
          </LineChart>
        </div>

      </div>
    );
  }
}

const msp = (state) => {
  return {

  };
};

const mdp = (dispatch) => {
  return {

  };
};

export default connect(msp, mdp)(StockChart)