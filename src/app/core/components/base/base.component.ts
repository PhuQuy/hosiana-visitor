import { Component, OnInit } from '@angular/core';
import { LanguageService } from '@app/core/services/language.service';
import { ShareService } from '@app/core/services/share.service';

@Component({
    selector: 'base',
    template: ''
})
export class BaseComponent implements OnInit {
    public currency: string = '';
    
    constructor(protected languageService: LanguageService, protected shareService: ShareService) {
        this.currency = this.languageService.getCurrentCurrency();

        this.shareService.currency.subscribe(currency => {
            this.languageService.setCurrency(currency);
            this.currency = this.languageService.getCurrentCurrency();
        })
    }

    ngOnInit() {
    }

}
