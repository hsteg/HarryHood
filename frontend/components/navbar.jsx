import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loggedin-navbar">
        <div className="loggedin-nav-logo-search">
          <div className="loggedin-nav-logo">
            Logo here
            </div>
          <div className="loggedin-nav-searchbar-container">
            <div className="loggedin-nav-searchbar">
              Searchbar here
              </div>
          </div>
        </div>
        <div className="loggedin-nav-right-links">
          <div className="loggedin-nav-right-links-link-item">Home</div>
          <div className="loggedin-nav-right-links-link-item">Notifications</div>
          <div className="loggedin-nav-right-links-link-item">
            <p>Account</p>
            <div className="loggedin-nav-right-links-account-dropdown-container">
              <div className="loggedin-nav-right-links-account-dropdown-menu">
                
              </div>
            </div>
          </div>
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