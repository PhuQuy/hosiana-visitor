import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BaseService } from '@app/core/services/base.service';
import {
    catchError,
    map,
} from 'rxjs/operators';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { LocalizeParser } from 'gocodee-localize-router';

const LANGUAGE_KEY_STORED = 'language';
const CURRENCY_KEY_STORED = 'currency';
@Injectable({
    providedIn: 'root'
})

export class AuthService extends BaseService {

    constructor(protected http: HttpClient, protected localStorageService: LocalStorageService, protected localizeParser: LocalizeParser) {
        super(http, localStorageService);

    }
    getToken(): string {
        return this.localStorageService.getItem('token')
    }

    getLocale(): string {
        let locale = this.localizeParser.currentLang;
        return locale ? locale : 'vi';
    }

    getCurrency():string {
        let currency = this.localStorageService.getItem(CURRENCY_KEY_STORED);
        return currency ? currency : 'vnd';
    }

    getPublicKey(): Observable<any> {
        const url = `${this.URL}/unauth/refresh-key`;
        return this.http.get<any>(url);
    }

    logIn(email: string, password: string): Observable<any> {
        const url = `${this.URL}/users/login`;
        return this.http.post<User>(url, { email: email, password: password });
    }

    signUp(email, password): Observable<User> {
        const url = `${this.URL}/users/register`;
        return this.http.post<User>(url, { email: email, password: password }).pipe(
            map((res: any) => res),
            catchError(this.handleError),
        );
    }
    forgotPassword(email): Observable<any> {
        const url = `${this.URL}/users/forgot`;
        return this.http.post<User>(url, { email: email });
    }

    receiveNews(email): Observable<any> {
        const url = `${this.URL}/subscribe`;
        return this.http.post<any>(url, { email : email });
    }

    likeListing(id:number, type:any): Observable<any> {
        const url = `${this.URL}/reactions/favorite`;
        return this.http.post<any>(url, { id: id, type: type });
    }

    resetPassword(token:any, password:any) {
        const url = `${this.URL}/users/reset`;
        return this.http.post<any>(url, {token: token, password: password});
    }
}
