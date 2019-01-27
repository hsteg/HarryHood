import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard-navbar">
        <div className="dashboard-nav-logo-search">
          <div className="dashboard-nav-logo">
            Logo here
            </div>
          <div className="dashboard-nav-searchbar-container">
            <div className="dashboard-nav-searchbar">
              Searchbar here
              </div>
          </div>
        </div>
        <div className="dashboard-nav-right-links">
          <div className="dashboard-nav-right-links-link-item">Home</div>
          <div className="dashboard-nav-right-links-link-item">Notifications</div>
          <div className="dashboard-nav-right-links-link-item">Account</div>
          <button onClick={this.props.logout}>Log Out :(</button>
        </div>
      </div>
    );
  }
};

const msp = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

const mdp = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};


export default connect(msp, mdp)(Navbar)