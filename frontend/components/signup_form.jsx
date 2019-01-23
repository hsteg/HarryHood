import { connect } from 'react-redux';
import React from 'react';
import { signup, clearErrors } from '../actions/session_actions';


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
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    handleSubmit(e){
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.signup(user).then(() => this.props.history.push('/'));
    }

    updateField(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        }
    }

    render() {
        const errors = this.props.errors.session ? this.props.errors.session[0] : null;
        return (
            <div className="signup-page">
                <div className="signup-nav-bar">
                    <div className="signup-row-item">
                        <img src={"../../assets/images/logo/logo.png"} />
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
                        <form className="signup-form">
                            <div className="signup-header-container">
                                <h1>Play Around With Your Money</h1>
                                <h2>HarryHood lets you pretend like you're investing in companies you love, commission-free.</h2>
                            </div>
                            <div className="signup-form-container">
                                <div className="signup-form-row">
                                    <div className="signup-two-row">
                                        <div className="signup-two-left">
                                            <input type="text" placeholder="First name" className="signup-field" />
                                        </div>
                                        <div className="signup-two-right">
                                            <input type="text" placeholder="Last name"className="signup-field" />
                                        </div>
                                    </div>
                                </div>
                                <div className="signup-form-row">
                                    <input type="text" placeholder="Email address" className="signup-field" />
                                </div>
                                <div className="signup-form-row">
                                    <input type="text" placeholder="Username" className="signup-field" />
                                </div>
                                <div className="signup-form-row">
                                    <input type="password" placeholder="Password (min. 7 characters)" className="signup-field" />
                                </div>
                                <div className="signup-form-row">
                                    <input type="submit" value="Sign Up" className="signup-button" />
                                </div>
                                <div className="signup-form-row">
                                    <p>Already signed up? <a href="#">Log in here.</a></p>
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
                            <img src="../../assets/images/icons/animat-rocket-green.gif" />
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
        clearErrors: () => dispatch(clearErrors()),
    };
}

export default connect(msp, mdp)(SignUpForm);