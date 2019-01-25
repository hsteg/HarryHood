import { connect } from 'react-redux';
import React from 'react';
import { signup, clearErrors, login } from '../actions/session_actions';
import { Link } from 'react-router-dom';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state).then(() => this.props.history.push('/'));
  }

  updateField(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    }
  }

  handleDemo(e) {
    e.preventDefault();
    const user = Object.assign({}, { username: "DemoMcDemoface", password: "demodemo" });
    this.props.login(user).then(() => this.props.history.push('/'));
  }

  passwordValidation() {
    if (this.state.password.length > 0 && this.state.password.length < 7) {
      return "invalid-signup-field";
    } else {
      return "signup-field";
    }
  }

  emailValidation() {
    return () => {
      const emailField = document.getElementById('signup-email');
      if (/(.+)@(.+){2,}\.(.+){2,}/.test(this.state.email)) {
        emailField.className = "signup-field"
      } else {
        emailField.className = "invalid-signup-field"
      }
    }
  }

  render() {
    const errors = this.props.errors.session.length > 0 ? (
      <div className="signup-form-row">
        <p className="signup-form-errors">
          {this.props.errors.session[0]}
        </p>
      </div>
    ) : (null);

    return (
      <div className="signup-page">
        <div className="signup-nav-bar">
          <div className="signup-row-item">
            <Link to="/"><img className="signup-logo-image" src={window.logoURL} /></Link>
          </div>
          <div className="signup-row-item">
            <h3>Account</h3>
            <p>The only info we need</p>
          </div>
          <div className="signup-row-item">
            <h3>Basic Info</h3>
            <p>Won't be collected</p>
          </div>
          <div className="signup-row-item">
            <h3>Identity</h3>
            <p>No need for verification</p>
          </div>
          <div className="signup-row-item">
            <h3>Funding</h3>
            <p>No funding necessary</p>
          </div>
          <div className="signup-row-item">
            <h3>Submit</h3>
            <p>On this page</p>
          </div>
        </div>
        <div className="signup-below-nav">
          <div className="signup-container">
            <div className="signup-content">
              <form className="signup-form" onSubmit={this.handleSubmit}>
                <div className="signup-header-container">
                  <h3>Play Around With Your Money</h3>
                  <h2>HarryHood lets you pretend like you're investing in companies you love, commission-free.</h2>
                </div>
                <div className="signup-form-container">
                  <div className="signup-form-row">
                    <div className="signup-two-row">
                      <div className="signup-two-left">
                        <input type="text" placeholder="First name" className="signup-field" onChange={this.updateField('first_name')} />
                      </div>
                      <div className="signup-two-right">
                        <input type="text" placeholder="Last name" className="signup-field" onChange={this.updateField('last_name')} />
                      </div>
                    </div>
                  </div>
                  <div className="signup-form-row">
                    <input type="text" id="signup-email" placeholder="Email address" className="signup-field" onChange={this.updateField('email')} onBlur={this.emailValidation()} />
                  </div>
                  <div className="signup-form-row">
                    <input type="text" placeholder="Username" className="signup-field" onChange={this.updateField('username')} />
                  </div>
                  <div className="signup-form-row">
                    <input type="password" placeholder="Password (min. 7 characters)" className={this.passwordValidation()} onChange={this.updateField('password')} />
                  </div>
                  {errors}
                  <div className="signup-form-row">
                    <button className="signup-button">Sign Up</button>
                  </div>
                  <div className="signup-form-row">
                    <button onClick={this.handleDemo} className="signup-button">Demo</button>
                  </div>
                  <div className="signup-form-row">
                    <p className="signup-form-already-signed-up">Already signed up? <Link to="/login">Login</Link></p>
                  </div>
                </div>
              </form>

              <div className="signup-footer-container">
                <hr className="signup-footer-line" />
                <div className="signup-footer-content">
                  <p>
                    All investments involve risk and the past performance of a security, or financial product does not
                    guarantee future
                    results or returns. Keep in mind that while diversification may help spread risk it does not assure a
                    profit, or
                    protect against loss, in a down market. There is always the potential of losing money when you invest in
                    securities, or
                    other financial products. Investors should consider their investment objectives and risks carefully before
                    investing. Also,
                    all transactions on this site aren't real. They're merely here to showcase my abilties as a software
                    developer.
                                </p>

                  <p>
                    No securities and investments are actually offered to customers of HarryHood Financial, which is definitely
                    not a member FINRA & SIPC.
                    HarryHood Financial is a wholly owned subsidiary of Harrison Steg.
                                </p>

                  <p>
                    You wont be able to check the background of HarryHood Financial LLC on FINRA’s BrokerCheck because this is
                    not a real brokerage.
                                </p>

                  <p>
                    HarryHood No Terms & No Conditions  Contact Me  FAQ's don't exist
                                </p>

                  <p>
                    © 2019 HarryHood. All rights reserved.
                                </p>
                </div>
              </div>
            </div>
            <div className="signup-sidebar">
              <div className="signup-sidebar-item">
                <img src={window.rocketGIF} />
                <h3>Watch your portfolio skyrocket.
                            Anytime. Anywhere.</h3>
                <p>No actual securities transactions, but real-time market data and mock transactions help you
                                understand my abilities as a software developer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}




const msp = (state) => {
  return {
    errors: state.errors,
  };
}

const mdp = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
}

export default connect(msp, mdp)(SignUpForm);