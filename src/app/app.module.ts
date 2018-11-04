import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/locales/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        NgtUniversalModule,
        AppRoutingModule,
        // CoreModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    providers: [],
})
export class AppModule { }
