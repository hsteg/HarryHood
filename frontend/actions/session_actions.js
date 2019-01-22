export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIEVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS"
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS"
import * as APIUtil from '../util/session_api_util';


export const signup = (user) => dispatch => {
    return APIUtil.signup(user).then(
        user => {
            return dispatch(receiveCurrentUser(user));
        },
        errors => dispatch(receiveErrors(errors.responseJSON))
    );
};

export const login = (user) => dispatch => {
    return APIUtil.login(user).then(
        user => {
            return dispatch(receiveCurrentUser(user));
        },
        errors => dispatch(receiveErrors(errors.responseJSON))
    );
};

export const logout = () => dispatch => {
    return APIUtil.logout().then(
        () => {
            return dispatch(logoutCurrentUser());
        },
        errors => dispatch(receiveErrors(errors.responseJSON))
    );
};

const receiveCurrentUser = user => {
    return {
        type: RECEIVE_CURRENT_USER,
        user
    };
};

const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER,
    }
};

const receiveErrors = (errors) => {
    return {
        type: RECEIEVE_SESSION_ERRORS,
        errors
    }
}

const clearErrors = () => {
    return {
        type: CLEAR_SESSION_ERRORS,
    };
};