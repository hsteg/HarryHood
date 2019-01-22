import React from 'react';
import ReactDOM from 'react-dom'
import { signUp, login, logout } from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {

    window.signUp = signUp;
    window.login = login;
    window.logout = logout;
    
    const root = document.getElementById('root');
    ReactDOM.render(<h1>hello</h1>, root);
});