import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';

import * as JsEncryptModule from 'jsencrypt';
import { AuthService } from '../../services/auth.service';
import {
    AuthActionTypes,
    PublicKey,
    LogIn, LogInSuccess, LogInFailure,
    SignUp, SignUpSuccess, SignUpFailure,
    LogOut,
    SignUpNextStep
} from '../actions/auth.actions';
import { LocalStorageService } from '@app/core/services/local-storage.service';
@Injectable()
export class AuthEffects {
    encrypt;
    constructor(@Inject(LOCAL_STORAGE) private localStorage: any,
        private actions: Actions,
        private authService: AuthService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) {
        this.encrypt = new JsEncryptModule.JSEncrypt();
    }

    @Effect()
    PublicKey: Observable<any> = this.actions
        .ofType(AuthActionTypes.PUBLIC_KEY)
        .map((action: PublicKey) => action.payload)
        .switchMap(payload => {
            const email = payload.email;
            const password = payload.password;
            return this.authService.getPublicKey()
                .map((res) => {
                    this.encrypt.setPublicKey(res.result.data.publicKey);
                    var encrypted = this.encrypt.encrypt(password);

                    const auth = {
                        email: email,
                        password: encrypted
                    };
                    return new LogIn(auth);
                })
                .catch((error) => {
                    return Observable.of(new LogInFailure({ error: error }));
                });
        });

    @Effect()
    SignUp: Observable<any> = this.actions
        .ofType(AuthActionTypes.SIGNUP)
        .map((action: SignUp) => action.payload)
        .switchMap(payload => {
            const email = payload.email;
            const password = payload.password;
            return this.authService.getPublicKey()
                .map((res) => {
                    this.encrypt.setPublicKey(res.result.data.publicKey);
                    var encrypted = this.encrypt.encrypt(password);
                    const auth = {
                        email: email,
                        password: encrypted
                    };
                    return new SignUpNextStep(auth);
                })
                .catch((error) => {
                    return Observable.of(new LogInFailure({ error: error }));
                });
        });

    @Effect()
    LogIn: Observable<any> = this.actions
        .ofType(AuthActionTypes.LOGIN)
        .map((action: LogIn) => action.payload)
        .switchMap(payload => {
            return this.authService.logIn(payload.email, payload.password)
                .map((res) => {
                    return new LogInSuccess({ token: res.result.data.token, user: res.result.data.profile });
                })
                .catch((error) => {
                    return Observable.of(new LogInFailure({ error: error }));
                });
        });

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((res) => {
            this.localStorageService.setItem('token', res.payload.token);
            this.localStorageService.setItem('user', res.payload.user);
            this.router.navigateByUrl('/');
        })
    );

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect()
    SignUpNextStep: Observable<any> = this.actions
        .ofType(AuthActionTypes.SIGNUP_NEXTSTEP)
        .map((action: SignUpNextStep) => action.payload)
        .switchMap(payload => {
            return this.authService.signUp(payload.email, payload.password)
                .map((user) => {
                    if(user['error']) {
                        return new SignUpFailure({ error: 'error ne' });
                    }
                    return new SignUpSuccess({ token: user.token, email: payload.email });
                })
                .catch((error) => {
                    return Observable.of(new SignUpFailure({ error: error }));
                });
        });

    @Effect({ dispatch: false })
    SignUpSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap((user) => {
            this.localStorageService.setItem('token', user.payload.token);
            this.router.navigateByUrl('/');
        })
    );

    @Effect({ dispatch: false })
    SignUpFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE)
    );

    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {
            this.localStorageService.remove('token');
        })
    );
}
