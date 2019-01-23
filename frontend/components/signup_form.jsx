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
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    

    render() {

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

export default connect(msp, mdp)(SignUpForm);