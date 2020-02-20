import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: {},
    signUpError: '',
    LogIn: '',
};

export const userSignUpReduces = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SUCCESS_SIGN_UP:
            return {
                ...state,
                user: {
                    ...action.payload,
                },
            };
        case actionTypes.FAILURE_SIGN_UP:
            return {
                ...state,
                signUpError:action.payload
            };
        case actionTypes.SUCCESS_LOG_IN:
            return {
                ...state,
                LogIn: true,
            };
        case actionTypes.FAILURE_LOG_IN || actionTypes.LOG_OUT:
            return {
                ...state,
                LogIn: false,
            };
        case actionTypes.LOG_OUT:
            return {
                ...state,
                LogIn: false,
            };
        default:
            return {
                ...state,
            }
    }
};