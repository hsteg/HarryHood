import React from 'react';
import LoginForm from './login_form';
import { Route } from "react-router-dom";
import Splash from './splash';

const App = () => {
    return (
        <div>
            <Route path="/login" component={LoginForm} />
            <Route path="/" component={Splash} />
        </div>
    );
};

export default App;

