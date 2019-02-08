import React from 'react';
import { connect } from 'react-redux';

class StockCompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.displayMarketCap = this.displayMarketCap.bind(this);
    this.displayAvgVolume = this.displayAvgVolume.bind(this);
  }

  displayMarketCap() {
    let formattedMarketCap;
    const marketCap = this.props.stock.stats.marketcap;
    if(marketCap > 1000000000) {
      formattedMarketCap = (marketCap / 1000000000).toFixed(2);
      return `${formattedMarketCap}B`
    } else {
      formattedMarketCap = (marketCap / 1000000).toFixed(2);
      return `${formattedMarketCap}M`
    }
  }

  displayAvgVolume() {
    let formattedVolume;
    const avgVolume = this.props.stock.quote.avgTotalVolume;
    formattedVolume = (avgVolume / 1000000).toFixed(2);
    return `${formattedVolume}M`
  }

  render() {
    return (
      <div className="content-company-profile">
        <div className="right-lower-header-container">
          <div className="right-lower-header-text">
            About
          </div>
        </div>
        <div className="company-profile-summary">
          {this.props.stock.company.description}
        </div>
        <div className="company-profile-attributes-container">
          <div className="company-profile-attributes-row">
            <div className="company-profile-attribute">
              <div className="company-profile-attribute-header">
                CEO
              </div>
              <div className="company-profile-attribute-content">
                {this.props.stock.company.CEO}
              </div>
            </div>
            <div className="company-profile-attribute">
              <div className="company-profile-attribute-header">
                Industry
              </div>
              <div className="company-profile-attribute-content">
                {this.props.stock.company.industry}
              </div>
            </div>
            <div className="company-profile-attribute">
              <div className="company-profile-attribute-header">
                Sector
              </div>
              <div className="company-profile-attribute-content">
                {this.props.stock.company.sector}
              </div>
            </div>
            <div className="company-profile-attribute">
              <div className="company-profile-attribute-header">
                Market Cap
              </div>
              <div className="company-profile-attribute-content">
                {this.displayMarketCap()}
              </div>
            </div>
          </div>
          <div className="company-profile-attributes-row">
          <div className="company-profile-attribute">
              <div className="company-profile-attribute-header">
                Consensus EPS
              </div>
              <div className="company-profile-attribute-content">
                {this.props.stock.stats.consensusEPS}
              </div>
            </div>
            <div className="company-profile-attribute">
              <div className="company-profile-attribute-header">
                Price-Earnings Ratio
              </div>
              <div className="company-profile-attribute-content">
                {this.props.stock.quote.peRatio}
              </div>
            </div>
            <div className="company-profile-attribute">
              <div className="company-profile-attribute-header">
                Dividend Yield
              </div>
              <div className="company-profile-attribute-content">
                {this.props.stock.stats.dividendYield.toFixed(2)}
              </div>
            </div>
            <div className="company-profile-attribute">
              <div className="company-profile-attribute-header">
                Average Volume
              </div>
              <div className="company-profile-attribute-content">
                {this.displayAvgVolume()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(StockCompanyProfile);