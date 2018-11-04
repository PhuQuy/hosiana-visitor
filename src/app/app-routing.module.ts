import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from 'gocodee-localize-router';
import { LocalizeRouterHttpLoader } from 'gocodee-localize-router-http-loader';

const routes = [
    {
        //path: 'home',
        path: '',
        loadChildren: './routes/home/home.module#HomeModule',
        data: {
            preload: true,
            transparent: true,
            routing: ''
        }
    }
];

export function HttpLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
    return new LocalizeRouterHttpLoader(translate, location, settings, http);
}

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
