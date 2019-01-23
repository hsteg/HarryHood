import React from 'react';
import LoginForm from './login_form';
import SignUpForm from './signup_form';
import { Route } from "react-router-dom";
import Splash from './splash';
import { AuthRoute } from '../util/route_util';


const App = () => {
    return (
        <div>
            <AuthRoute path="/login" component={LoginForm} />
            <AuthRoute path="/signup" component={SignUpForm} />
            <Route exact path="/" component={Splash} />
        </div>
    );
};

export default App;

