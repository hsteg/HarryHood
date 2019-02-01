import React from 'react';
import { connect } from 'react-redux';
import { getStockSearchResults, clearUserSearchResults } from '../actions/stock_actions';
import { Link } from 'react-router-dom';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.results = this.results.bind(this);
  }

  handleInput(e) {
    this.setState({ searchVal: e.currentTarget.value }, () => {
      if (this.state.searchVal.length > 0) {
        this.props.getStockSearchResults(this.state.searchVal);
      } else {
        this.props.clearUserSearchResults();
      }
    });
  }

  results() {
    const searchResults = Object.values(this.props.searchResults).map(result => {
      <Link to={`/stock/${result.symbol}`} className="search-result" key={result.id}>
        <div className="search-result-symbol">{result.symbol}</div>
        <div className="search-result-name">{result.name}</div>
      </Link>
    });
    debugger
    return this.state.searchVal.length > 0 ? searchResults : (<div className="empty-search"></div>) ;
  }





  render() {
    return (
      <div>
        <input type="text" onChange={this.handleInput} className="search-bar" />
        {this.results()}
      </div>
    );
  }
}

const msp = (state) => {
  return {
    searchResults: state.ui.searchResults
  };
}

const mdp = (dispatch) => {
  return {
    getStockSearchResults: (searchTerm) => dispatch(getStockSearchResults(searchTerm)),
    clearUserSearchResults: () => dispatch(clearUserSearchResults())
  };
}

export default connect(msp, mdp)(SearchBar);

