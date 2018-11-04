import { Injectable, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '@app/core/services/language.service';
import { Observable, Observer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShareService {
    constructor(private languageService: LanguageService) {
    }
    @Output() change: EventEmitter<boolean> = new EventEmitter();

    toggle(active) {
        this.change.emit(active);
    }

    @Output() showBack: EventEmitter<boolean> = new EventEmitter();

    changeShowBack(active) {
        this.showBack.emit(active);
    }

    @Output() scroll: EventEmitter<number> = new EventEmitter();
    scrollTo(y) {
        this.scroll.emit(y);
    }

    @Output() transparent: EventEmitter<boolean> = new EventEmitter();

    toggleNav(active) {
        this.transparent.emit(active);
    }

    @Output() currency: EventEmitter<string> = new EventEmitter();
    changeCurrency(currency) {
        this.languageService.setCurrency(currency);
        this.currency.emit(currency);
    }

    @Output() language: EventEmitter<string> = new EventEmitter();
    changeLanguage(language) {
        this.languageService.setLanguage(language);
        this.language.emit(language);
    }

    @Output() searching: EventEmitter<any[]> = new EventEmitter();
    changeSearching(search) {
        this.searching.emit(search);
    }

    @Output() currentRouting: EventEmitter<any[]> = new EventEmitter();
    changeRouting(routing) {
        this.currentRouting.emit(routing);
    }

    type: string;
    @Output() agencyType: EventEmitter<string> = new EventEmitter();
    changeAgencyType(type) {
        this.type = type;
        this.agencyType.emit(type);
    }

    getType(): Observable<string> {
        return Observable.create((obs: Observer<string>) => {
            obs.next(this.type);
            obs.complete();
        });
    }

    @Output() blogSearchKey: EventEmitter<string> = new EventEmitter();
    changeSearchKey(key) {
        this.blogSearchKey.emit(key);
    }

    @Output() blogCurrentSlug: EventEmitter<string> = new EventEmitter();
    changeBlogCurrentSlug(key) {
        this.blogCurrentSlug.emit(key);
    }
}
