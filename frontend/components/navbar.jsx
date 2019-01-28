import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: "loggedin-nav-right-links-account-dropdown-container-hidden"
    }
    this.navOpen = this.navOpen.bind(this);
    this.navClose = this.navClose.bind(this);
  }

  navOpen() {
    this.setState({
      dropdown: "loggedin-nav-right-links-account-dropdown-container",
    });
    document.addEventListener('click', this.navClose, false);
    document.getElementById('dropdown').addEventListener('click',function(e) {
      e.stopPropagation();
    }, true);
  }

  navClose() {
    this.setState({
      dropdown: "loggedin-nav-right-links-account-dropdown-container-hidden",
    });
    document.removeEventListener('click', this.navClose);
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
            <button onClick={this.navOpen}>Account</button>
            <div className={this.state.dropdown}  id="dropdown" >
              <div className="loggedin-nav-right-links-account-dropdown-menu">
                <div className="loggedin-nav-right-links-account-dropdown-menu-header">
                  <h3>
                    {this.props.currentUser.first_name} {this.props.currentUser.last_name}
                  </h3>
                  <div className="loggedin-nav-right-links-account-dropdown-menu-header-finances">
                    <div className="loggedin-nav-right-links-dropdown-finances-porfolio-value">
                      porfolio value
                    </div>
                    <div className="loggedin-nav-right-links-dropdown-finances-cash-balance">
                      {this.props.currentUser.cash_balance}
                    </div>
                  </div>
                </div>
                <div className="loggedin-nav-right-links-account-dropdown-menu-content-2">
                  content 2
                </div>
                <div className="loggedin-nav-right-links-account-dropdown-menu-content-3">
                  <button onClick={this.props.logout}>Log Out :(</button>
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