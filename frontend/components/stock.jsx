import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

class Stock extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

  }
}

export default connect(msp, mdp)(Stock);