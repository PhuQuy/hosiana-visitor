import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ListingActionType, LikeListing } from '../actions/listing.action';
import { map } from 'rxjs-compat/operator/map';
import { AuthService } from '@core/services/auth.service';
import { ListingService } from '@core/services/listing.service';

@Injectable()
export class ListingEffect {
    constructor(private actions: Actions, private listingService: ListingService, private authService: AuthService) {

    }

    @Effect()
    LikeListingInteractive: Observable<any> = this.actions
        .ofType(ListingActionType.LIKE_LISTING)
        .map((action: LikeListing) => action.payload)
        .switchMap(payload => {
            return this.authService.likeListing(payload.id, payload.type)
                        .map((data) =>{});
        })
}