import { Injectable } from '@angular/core';
import { InitParams } from 'ngx-facebook';
import { FacebookService } from 'ngx-facebook';
@Injectable({
    providedIn: 'root'
})
export class FbService {

    constructor(private facebookService: FacebookService) {

        // let initParams: InitParams = {
        //     appId: '2085456745104842',
        //     version: 'v3.1'
        // };

        // this.facebookService.init(initParams);

    }

}
