import * as actions from '../actions/actionTypes';

export const userSuccessSignUp = data => {
        return {
            type: actions.SUCCESS_SIGN_UP,
            payload: data
        }
};

export const userFailureSignUp = err => {
    return {
        type: actions.FAILURE_SIGN_UP,
        payload: err.message,
    }
};

export const userSuccessLogIn = () => {
    return {
        type: actions.SUCCESS_LOG_IN,
    }
};

export const userFailureLogIn = () => {
    return {
        type: actions.FAILURE_LOG_IN,
    }
};

export const userLogOut = () => {
    return {
        type: actions.LOG_OUT,
    }
};