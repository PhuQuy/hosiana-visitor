import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { environment } from '@env/environment';
import {
    throwError,
} from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    protected URL = '';

    constructor(protected http: HttpClient, protected localStorageService: LocalStorageService) {
        this.URL = `${environment.BASE_URL}/${environment.VERSION}`;
    }

    protected handleError(error: any) {
        return throwError(error);
    }

    protected getUrl(params): string {
        let result = '';
        let first = true;
        params.forEach(param => {
            if(param.value != null && param.value.length != 0) {
                if (first) {
                    result += `?${param.name}=${param.value}`;
                } else {
                    result += `&${param.name}=${param.value}`;
                }
                first = false;
            }
        });
        return result;
    }
}
