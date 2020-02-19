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