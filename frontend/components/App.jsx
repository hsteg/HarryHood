import React from 'react';
import LoginForm from './login_form';
import SignUpForm from './signup_form';
import { Route } from "react-router-dom";
import Splash from './splash';

const App = () => {
    return (
        <div>
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignUpForm} />
            <Route exact path="/" component={Splash} />
        </div>
    );
};

export default App;

