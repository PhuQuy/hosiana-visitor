import { User } from '../../models/user';
import { All, AuthActionTypes } from '../actions/auth.actions';
const APP_PREFIX = 'HOS-';

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;
    language: string | null
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
    language: null
};

export function reducer(state = initialState, action: All): any {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    email: action.payload.email,
                    ...action.payload.user
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'error.errorMsg'
            };
        }
        case AuthActionTypes.SIGNUP_SUCCESS: {
            return {
                ...state,
                isAuthenticated: false,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.SIGNUP_FAILURE: {
            return {
                ...state,
                errorMessage: 'That email is already in use.'
            };
        }
        case AuthActionTypes.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
