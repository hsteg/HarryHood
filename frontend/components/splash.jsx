import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';


class Splash extends React.Component {

  render() {
    return (
      <div className="splash">
        <div className="splash-navbar-holder">
          <div className="splash-navbar">
            <div className="splash-logo-name-holder">
              <Link to="/"><img className="splash-logo-image" src={window.logoURL} /></Link>
              <span>HarryHood</span>
            </div>
            <div className="splash-navbar-left-links-holder">
              <h3>Content 1</h3>
              <h3>Content 2</h3>
              <h3>Content 3</h3>
              <h3>Content 4</h3>

            </div>
            <div className="splash-navbar-right-buttons-holder">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>

        <div className="splash-content">
          <section className="splash-section1">
            <div className="splash-content-section1">
              <div className="splash-content-section1-left">
                <h1>blah blah header</h1>
                <h2>blah blah subheaer</h2>
                <p>paragraph text</p>
              </div>
              <div className="splash-content-section1-right">
                <img className="splash-content-section1-image" src={window.splashMockURL} />
              </div>
            </div>
          </section>
          <section className="splash-section2">
            <div className="splash-section2-text">
              <span>Mobile-friendly layout, coming soon.</span>
            </div>
            <img className="splash-section2-img" src={window.dogURL} />
          </section>
          <section className="splash-section3">

          </section>
        </div>
      </div>

    );
  }
}

const msp = (state) => {
  return {

  };
}

const mdp = (dispatch) => {
  return {

  };
}

export default connect(msp, mdp)(Splash);