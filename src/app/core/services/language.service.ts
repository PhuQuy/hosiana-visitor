import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, Inject } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeParser, LocalizeRouterService } from 'gocodee-localize-router';

const LANGUAGE_KEY_STORED = 'language';
const CURRENCY_KEY_STORED = 'currency';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    language: string = '';
    currency: string = '';
    constructor(@Inject(LOCAL_STORAGE) private localStorage: any, protected translateService: TranslateService, protected localStorageService: LocalStorageService, private localizeParser: LocalizeParser, private localize: LocalizeRouterService) {
        this.translateService.addLangs(environment.LANGUAGE.supported);
        // this.translateService.setDefaultLang(environment.LANGUAGE.default);

        // let languageStored = localStorageService.getItem(LANGUAGE_KEY_STORED);
        // if (languageStored) {
        //     this.language = languageStored;
        // } else {
        //     const browserLang = this.translateService.getBrowserLang();
        //     if (browserLang) {
        //         this.language = browserLang;
        //     }
        // }
        // console.log(this.localizeParser.currentLang);
        localizeParser.defaultLang = 'vi';
        this.language = localizeParser.currentLang;
        // console.log(this.language);
        
        this.setLanguage(this.language);
        this.localize.changeLanguage(this.language);

        let currencyStored = localStorageService.getItem(CURRENCY_KEY_STORED);
        if (currencyStored) {
            this.currency = currencyStored;
        } else {
            this.currency = environment.CURRENCY.default;
        }
    }

    getCurrentLanguage() {
        return this.localizeParser.currentLang;;
    }

    setLanguage(language: string) {
        if (this.checkMatch(language, environment.LANGUAGE.supported)) {
            this.language = language;
            this.translateService.use(language);
            this.localStorage.setItem(LANGUAGE_KEY_STORED, language);
        } else {
            this.translateService.use(environment.LANGUAGE.default);
        }
    }

    checkMatch(language: string, supported: Array<string>): boolean {
        return supported.filter(support => language.toLowerCase() === support).length > 0;
    }

    getCurrentCurrency() {
        return this.currency;
    }

    setCurrency(currency: string) {
        if (this.checkMatch(currency, environment.CURRENCY.supported)) {
            this.currency = currency;
            this.localStorage.setItem(CURRENCY_KEY_STORED, currency);
        } else {
            this.currency = environment.CURRENCY.default;
        }
    }

    getInstance() {
        return this.translateService;
    }
}
