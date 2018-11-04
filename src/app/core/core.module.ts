import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// import { FooterComponent } from '@app/components/footer/footer.component';
import { AuthGuardService } from '@app/core/services/auth-guard.service';
import { AuthService } from '@app/core/services/auth.service';
import { CustExtBrowserXhr } from '@app/core/services/cust-ext-browser-xhr';
import { ShareService } from '@app/core/services/share.service';
import { TokenInterceptor } from '@app/core/services/token.interceptor';
// import { HomeProfileComponent } from '@app/modules/modals/home-profile/home-profile.component';
// import { LoginComponent } from '@app/modules/modals/login/login.component';
// import { SharedModule } from '@app/shared';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LocalizeRouterModule } from 'gocodee-localize-router';
import { localStorageSync } from 'ngrx-store-localstorage';
import { BaseComponent } from './components/base/base.component';
import { reducers } from './store/app.states';
import { AuthEffects } from './store/effects/auth.effects';
import { RedirectLinkComponent } from './components/redirect-link/redirect-link.component';
// import { ForgotPasswordComponent } from '@app/modules/modals/forgot-password/forgot-password.component';
// import { CommercialFilterComponent } from '@app/modules/modals/commercial-filter/commercial-filter.component';
// import { LiveSearchModule } from '@app/components/live-search/live-search.module';
// import { RedirectLinkComponent } from '@core/components/redirect-link/redirect-link.component';
// import { ResetPasswordComponent } from '@modules/modals/reset-password/reset-password.component';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync(
    {
      keys: ['auth'],
      rehydrate: true
    })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects]),
    LocalizeRouterModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ShareService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: BrowserXhr, useClass: CustExtBrowserXhr },
  ],
  declarations: [BaseComponent, RedirectLinkComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: []
})
export class CoreModule { }
