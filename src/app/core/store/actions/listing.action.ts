import { Action } from '@ngrx/store';

export enum ListingActionType {
    LIKE_LISTING = '[Listing] Like a listing'
}

export class LikeListing implements Action {
    readonly type = ListingActionType.LIKE_LISTING;
    constructor(public payload: any) { }
}

export type All = | LikeListing;