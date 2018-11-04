import { Action } from '@ngrx/store';


export enum LangActionTypes {
    SET_LANGUAGE = '[Lang] Set Key',
    GET_LANGUAGE = '[Lang] Get Key'
}

export class SetLanguage implements Action {
	readonly type = LangActionTypes.SET_LANGUAGE;
	constructor(public payload:any) {}
}

export class GetLanguage implements Action {
	readonly type = LangActionTypes.GET_LANGUAGE;
	constructor(public payload:any) {}
}

export type All =
    | SetLanguage
    | GetLanguage;
