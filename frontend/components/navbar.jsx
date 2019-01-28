import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/session_actions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: "account-dropdown-hidden"
    }
    this.navOpen = this.navOpen.bind(this);
    this.navClose = this.navClose.bind(this);
  }

  navOpen() {
    this.setState({
      dropdown: "account-dropdown",
    });
    document.addEventListener('click', this.navClose, { once: true, useCapture: false });

    document.getElementById('dropdown').addEventListener('click', function (e) {
      e.stopPropagation();
    }, true);
  }

  navClose() {
    this.setState({
      dropdown: "account-dropdown-hidden",
    });
  }

  render() {
    return (
      <div className="loggedin-navbar">
        <div className="loggedin-nav-logo-search">
          <img className="loggedin-nav-logo" src={window.logoURL} />
          <div className="loggedin-nav-searchbar-container">
            <div className="loggedin-nav-searchbar">
              Searchbar here
              </div>
          </div>
        </div>
        <div className="loggedin-nav-right-links">
          <Link to="/" className="loggedin-nav-right-links-link-item">Home</Link>
          <div className="loggedin-nav-right-links-link-item">
            <button onClick={this.navOpen} 
            className={this.state.dropdown === "account-dropdown" ? "loggedin-nav-links-account-button-green" : "loggedin-nav-links-account-button"}>
              Account
            </button>
            <div className={this.state.dropdown} >
              <div className="loggedin-nav-right-links-account-dropdown-menu">
                <div className="dropdown-menu-header" id="dropdown">
                  <h3 className="dropdown-menu-header-name">
                    {this.props.currentUser.first_name} {this.props.currentUser.last_name}
                  </h3>
                  <div className="dropdown-menu-header-finances">
                    <div className="dropdown-finances-porfolio-value">
                      <h1 className="dropdown-portfolio-value-numbers">$12345.67</h1>
                      <h1 className="dropdown-portfolio-value-text">Portfolio Value</h1>
                    </div>
                    <div className="dropdown-finances-cash-balance">
                      <h1 className="dropdown-portfolio-value-numbers">${this.props.currentUser.cash_balance}</h1>
                      <h1 className="dropdown-portfolio-value-text">Buying Power</h1>
                    </div>
                  </div>
                </div>
                <div className="dropdown-menu-content-2">
                  
                </div>
                <div className="dropdown-menu-content-3">
                  <button onClick={this.props.logout} className="dropdown-signout-button">
                    <i className="fas fa-sign-in-alt icon-signout"></i>
                    <h1 className="dropdown-signout-button-text">Log Out</h1>
                  </button>
                </div>
              </div>
            </div>
          </div>
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