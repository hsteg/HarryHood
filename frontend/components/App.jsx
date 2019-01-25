import React from 'react';
import LoginForm from './login_form';
import SignUpForm from './signup_form';
import { Route } from "react-router-dom";
import Splash from './splash';
import Dashboard from './dashboard';
import Stock from './stock';
import { AuthRoute, ProtectedRoute } from '../util/route_util';


const App = () => {
    return (
        <div>
            <AuthRoute path="/login" component={LoginForm} />
            <AuthRoute path="/signup" component={SignUpForm} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <AuthRoute exact path="/" component={Splash} />
            <ProtectedRoute path="/dashboard/:id" component={Stock} />
        </div>
    );
};

export default App;

