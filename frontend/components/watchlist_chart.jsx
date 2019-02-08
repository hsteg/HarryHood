import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, YAxis, ReferenceLine } from 'recharts';


class WatchListChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartData = this.chartData.bind(this);
    this.chartColor = this.chartColor.bind(this);
  }

  chartData() {
    const oneDayChartData = [];
    this.props.chartData.forEach(dataPoint => {
      let dpObject = {};
      dpObject['time'] = (dataPoint.minute).toString();
      dpObject['price'] = dataPoint.close;

      if(dpObject.price === null) {return}
      oneDayChartData.push(dpObject);
    }
    );
    let latestPrice = {};
    latestPrice['time'] = "mostRecent";
    latestPrice['price'] = this.props.quote.latestPrice;
    oneDayChartData.push(latestPrice);
    return oneDayChartData;
  }

  chartColor() {
    const { previousClose, latestPrice } = this.props.quote;
    return (previousClose <= latestPrice) ? ("#21ce99") : ("#f45531");
  }


  render() {
    const width = (((this.props.chartData.length) / 390) * 110);
    const range = this.props.quote.latestPrice > this.props.quote.previousClose ? [this.props.quote.previousClose, this.props.quote.high] : [this.props.quote.low, this.props.quote.previousClose];
    
    return (
      <div className="watchlist-actual-chart">
        <LineChart width={width} height={30} data={this.chartData()}>
          <Line type="monotone" dataKey="price" stroke={this.chartColor()} dot={false} strokeWidth={1} />
          <YAxis type="number" domain={range} hide={true} />
          <ReferenceLine y={this.props.quote.previousClose} strokeDasharray="1 1" stroke="gray" isFront={false} />
        </LineChart>
      </div>
    );
  }
}


export default  connect(null, null)(WatchListChart)