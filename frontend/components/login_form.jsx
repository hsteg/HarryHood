import { connect } from 'react-redux';
import { login, clearErrors } from '../actions/session_actions';
import React from 'react';




class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateField = this.updateField.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
    }

    componentWillMount() {
        this.props.clearErrors();
    }

    handleSubmit(e){
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.login(user).then(() => this.props.history.push('/'));
    }

    updateField(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        }
    }

    handleDemo(e){
      e.preventDefault();
      const user = Object.assign({}, {username: "DemoMcDemoface", password: "demodemo"});
      this.props.login(user).then(() => this.props.history.push('/'));
  } 

    render() {
        const errors = this.props.errors.session ? this.props.errors.session[0] : null;

        
        return (
            <div className="page">
                <div className="left-image">
                </div>
                <div className="right-half">
                    <div className="login-box">
                        <h2 className="welcome-message">Welcome to HarryHood</h2>
                        <div className="form">
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    <div>Username</div>
                                    <input type="text" className="field" onChange={this.updateField('username')}/>
                                </label>
                                <label>
                                    <div>Password</div>
                                    <input type="password" className="field" onChange={this.updateField('password')}/>
                                </label>
                                <div>
                                    <p className="login-p"><button onClick={this.handleDemo} className="demo-button" >Don't want to sign up? Try the demo mode!</button></p>
                                </div>
                                <div>
                                    <p className="login-p">{errors}</p>
                                </div>
                                <button className="sign-in-button">Sign In</button>
                            </form>
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
        login: (user) => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors()),
    };
}

export default connect(msp, mdp)(LoginForm);

