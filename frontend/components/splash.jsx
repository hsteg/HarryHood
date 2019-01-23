import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';


class Splash extends React.Component {

    render() {
        return (
            <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
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