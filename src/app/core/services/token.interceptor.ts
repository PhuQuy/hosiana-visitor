import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { LanguageService } from './language.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeParser } from 'gocodee-localize-router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthService;
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private injector: Injector) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const token: string = this.authService.getToken();
    const language: string = this.authService.getLocale();
    const currency: string = this.authService.getCurrency();

    request = request.clone({
      setHeaders: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'deviceId': '85b600edd1844a0387bf21b6b141aef4',
        'appToken': '2mqK7VPDqjLGG9lz2L7AvqfdEdCyIott8SoqC7oAnuI6wg3O9GQnHa0l2jA24j6j',
        'locale': language ? language : 'vi'
      }
    });
    return next.handle(request);
  }
}

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private router: Router) { }
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     return next.handle(request)
//       .catch((response: any) => {
//         if (response instanceof HttpErrorResponse && response.status === 401) {
//           // localStorage.removeItem('token');
//           this.router.navigateByUrl('/');
//         }
//         return Observable.throw(response);
//       });
//   }
// }
