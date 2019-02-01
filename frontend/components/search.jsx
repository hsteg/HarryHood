import React from 'react';
import { connect } from 'react-redux';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchVal: '';
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({searchVal: e.currentTarget.value})
  }

  matches() {
    const matches = [];
    if (this.state.inputVal.length === 0) {
      return this.props.names;
    }

    this.props.names.forEach(name => {
      const sub = name.slice(0, this.state.inputVal.length);
      if (sub.toLowerCase() === this.state.inputVal.toLowerCase()) {
        matches.push(name);
      }
    });

    if (matches.length === 0) {
      matches.push('No matches');
    }

    return matches;
  }

  

  render() {
    return ;
  }
}

