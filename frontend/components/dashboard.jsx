import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <h2>Welcome to HarryHood, {this.props.currentUser.first_name}</h2>
                <button onClick={this.props.logout}>Log Out :(</button>
            </div>
        );
    }
}

const msp = (state) => {
    return {
        currentUser: state.entities.users[state.session.id]
    };
};

const mdp = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
}

export default connect(msp, mdp)(Dashboard);