import React from 'react';
import { connect } from 'react-redux';
import { getStockSearchResults, clearUserSearchResults } from '../actions/stock_actions';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      timeout: null
    }

    this.handleInput = this.handleInput.bind(this);
    this.results = this.results.bind(this);
    this.clearSearchResults = this.clearSearchResults.bind(this);
    this.displaySearchResults = this.displaySearchResults.bind(this);
  }

  handleInput(e) {
    clearTimeout(this.state.timeout);
    const timeout = setTimeout(this.displaySearchResults, 750);
    this.setState({ searchVal: e.currentTarget.value, timeout: timeout });
  }

  displaySearchResults() {
    const searchBarContainer = document.querySelector(".search-bar-container");

    if (this.state.searchVal.length > 0) {
      document.addEventListener('click', this.clearSearchResults, { once: true, useCapture: false });

      document.querySelector('.search-bar-container').addEventListener('click', function (e) {
        e.stopPropagation();
      }, true);

      this.props.getStockSearchResults(this.state.searchVal);

      searchBarContainer.classList.add("box-shadow");
    } else {
      searchBarContainer.classList.remove("box-shadow");
      this.props.clearUserSearchResults();
    }
  }


  clearSearchResults() {
    document.querySelector('.search-bar').value = '';
    this.setState({ searchVal: '' });
    this.props.clearUserSearchResults();
  }

  componentWillUnmount() {
    this.props.clearUserSearchResults();
  }

  results() {
    const searchResults = Object.values(this.props.searchResults).sort(function (a, b) {
      let firstSymbol = a.symbol;
      let secondSymbol = b.symbol;
      if (firstSymbol < secondSymbol) {
        return -1;
      } else {
        return 1;
      }
    }).map(result => {
      return (
        <Link to={`/stock/${result.symbol}`} className="search-result" key={result.id}>
          <div className="search-result-symbol">{result.symbol}</div>
          <div className="search-result-name">{result.name}</div>
        </Link>);
    });
    return (this.props.searchResults !== {}) ? searchResults : (<div className="empty-search"></div>);
  }

  render() {
    return (
      <div className="search-bar-container">
        <div className="search-holder">
          <i className="fas fa-search-dollar"></i>
          <input type="text"
            onChange={this.handleInput}
            className="search-bar"
            placeholder="Search" />
        </div>
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

