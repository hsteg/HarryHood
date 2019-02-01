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

  

  

  render() {
    return ;
  }
}

