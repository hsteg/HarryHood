import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Splash extends React.Component {

  render() {
    return (
      <div className="splash">
        <div className="splash-navbar-holder">
          <div className="splash-navbar">
            <div className="splash-logo-name-holder">
              <Link to="/"><img className="splash-logo-image" src={window.logoURL} /></Link>
              <div className="splash-logo-text-holder">
                <div className="splash-logo-text">HarryHood</div>
                <div className="splash-logo-byline">by: Harrison Steg</div>

              </div>
            </div>
            <div className="splash-navbar-left-links-holder">
              <div className="splash-navbar-left-link-item">
                <a href="https://linkedin.com/in/hsteg/" target="_blank">LinkedIn</a>
              </div>
              <div className="splash-navbar-left-link-item">
                <a href="https://github.com/hsteg" target="_blank">GitHub</a>
              </div>
              <div className="splash-navbar-left-link-item">
                <a href="http://angel.co/hsteg" target="_blank">AngelList</a>
              </div>
              <div className="splash-navbar-left-link-item">
                <a href="http://dev.harrisonsteg.com" target="_blank">Personal Site</a>
              </div>
            </div>
            <div className="splash-navbar-right-buttons-holder">
              <Link to="/login" className="splash-login">Log In</Link>
              <Link to="/signup"><button className="splash-signup-button">Sign Up</button></Link>
            </div>
          </div>
        </div>

        <div className="splash-content">
          <section className="splash-section1">
            <div className="splash-content-section1">
              <div className="splash-content-section1-left">
                <h1>Invest for Free</h1>
                <h3>Pretend to invest in stocks and ETFs with real-time data and functionality, all commission-free, right from your desktop.</h3>
                <Link to="/signup"><button className="splash-signup-button">Sign Up</button></Link>
              </div>
              <div className="splash-content-section1-right">
                <img className="splash-content-section1-image" src={window.splashMockURL} />
              </div>
            </div>
          </section>
          <section className="splash-section2">
            <div className="splash-section2-text">
              Mobile-friendly layout, coming soon.
            </div>
            <img className="splash-section2-img" src={window.dogURL} />
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