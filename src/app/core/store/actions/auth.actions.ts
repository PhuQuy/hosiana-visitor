import { Action } from '@ngrx/store';


export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    PUBLIC_KEY = '[Auth] Public Key',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',
    SIGNUP = '[Auth] Signup',
    SIGNUP_NEXTSTEP = '[Auth] Signup Next Step',
    SIGNUP_SUCCESS = '[Auth] Signup Success',
    SIGNUP_FAILURE = '[Auth] Signup Failure',
    LOGOUT = '[Auth] Logout',
    GET_STATUS = '[Auth] GetStatus',
    FORGOT_PASSWORD = '[Auth] Forgot Password',
    FORGOT_PASSWORD_SUCCESS = '[Auth] Forgot Password Sucess',
    FORGOT_PASSWORD_FAILURE = '[Auth] Forgot Password Failure',
    RECEIVE_NEWS = '[Auth] Receive news in HOS',
    RESET_PASSWORD = '[Auth] Reset passwrod',
    RESET_PASSWORD_SUCCESS = '[Auth] Reset passwrod success',
    RESET_PASSWORD_FAILURE = '[Auth] Reset passwrod failure',
}

// Get the pulicKey before login and signup
export class PublicKey implements Action {
    readonly type = AuthActionTypes.PUBLIC_KEY;
    constructor(public payload: any) { }
}

export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class LogInFailure implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: any) { }
}

export class SignUp implements Action {
    readonly type = AuthActionTypes.SIGNUP;
    constructor(public payload: any) { }
}

export class SignUpNextStep implements Action {
    readonly type = AuthActionTypes.SIGNUP_NEXTSTEP;
    constructor(public payload: any) { }
}

export class SignUpSuccess implements Action {
    readonly type = AuthActionTypes.SIGNUP_SUCCESS;
    constructor(public payload: any) { }
}

export class SignUpFailure implements Action {
    readonly type = AuthActionTypes.SIGNUP_FAILURE;
    constructor(public payload: any) { }
}

export class LogOut implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export class ForgotPassword implements Action {
    readonly type = AuthActionTypes.FORGOT_PASSWORD;
    constructor(public payload: any) { }
}

export class ForgotSuccess implements Action {
    readonly type = AuthActionTypes.FORGOT_PASSWORD_SUCCESS;
    constructor(public payload: any) { }
}

export class ForgotPasswordFailure implements Action {
    readonly type = AuthActionTypes.FORGOT_PASSWORD_FAILURE;
    constructor(public payload: any) { }
}

export class ReceiveNews implements Action {
    readonly type = AuthActionTypes.RECEIVE_NEWS;
    constructor(public payload: any) { }
}

export class ResetPassword implements Action {
    readonly type = AuthActionTypes.RESET_PASSWORD;
    constructor(public payload: any) { }
}

export class ResetPasswordSuccess implements Action {
    readonly type = AuthActionTypes.RESET_PASSWORD_SUCCESS;
    constructor(public payload: any) { }
}

export class ResetPasswordFailure implements Action {
    readonly type = AuthActionTypes.RESET_PASSWORD_FAILURE;
    constructor(public payload: any) { }
}

export type All =
    | PublicKey
    | LogIn
    | LogInSuccess
    | LogInFailure
    | SignUp
    | SignUpNextStep
    | SignUpSuccess
    | SignUpFailure
    | LogOut
    | ForgotPassword
    | ForgotSuccess
    | ForgotPasswordFailure
    | ReceiveNews;
