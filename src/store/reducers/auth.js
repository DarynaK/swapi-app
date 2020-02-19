import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: {},
    signUpError: '',
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
        default:
            return {
                ...state,
            }
    }
};