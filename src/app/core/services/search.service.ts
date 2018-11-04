import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { Observable } from 'rxjs';
import { BaseModel } from '@app/core/models/base.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SearchService extends BaseService {

    searchAgencies(search: string, city: number, district: number, offset: number, limit: number): Observable<BaseModel> {

        let url = this.getUrl([{ name: "search", value: search }, { name: 'city', value: city },
        { name: 'district', value: district }, { name: 'offset', value: offset }, { name: 'limit', value: limit }]);

        return this.http.get<any>(`${this.URL}/agencies/real-estate/search${url}`).pipe(
            map((res) => {
                let result = res.result.data;
                return new BaseModel(result.items, result.total)
            }),
            catchError(this.handleError)
        );
    }

    searchProjects(params: { search: string, city: number, district: number, street: string, category: number, sortBy: string }): Observable<BaseModel> {
        params = Object.assign({
            search: null,
            city: 1,
            district: 0,
            street: 0,
            category: null,
            sortBy: 'updated-asc'
        }, params);

        let routes = '';
        Object.keys(params).map((key) => {
            if (params[key]) {
                routes += `${key}=${params[key]}&`;
            }
        });
        routes = routes.slice(0, routes.length - 1);
        return this.http.get<any>(`${this.URL}/projects/search?${routes}`).pipe(
            map((res) => {
                let result = res.result.data;
                return new BaseModel(result.items, result.total)
            }),
            catchError(this.handleError)
        );
    }

    livesearchProjects(search: string): Observable<BaseModel> {
        return this.http.get<any>(`${this.URL}/projects/search?search=${search}`).pipe(
            map((res) => {
                let result = res.result.data;
                return new BaseModel(result.items, result.total)
            }),
            catchError(this.handleError)
        );
    }

    liveSearchListings(param?: string): Observable<any> {
        return this.http.get<any>(`${this.URL}/listing-searchs?${param ? 'search=' + param : ''}`).pipe(
            map((res) => {
                let result = res.result.data;
                return result.items;
            }),
            catchError(this.handleError)
        );
    }

    searchAllProject(): Observable<BaseModel> {
        return this.http.get<any>(`${this.URL}/projects/search`).pipe(
            map((res) => {
                let result = res.result.data;
                return new BaseModel(result.items, result.total)
            }),
            catchError(this.handleError)
        );
    }

    searchBlogs(search: string): Observable<BaseModel> {
        return this.http.get<any>(`${this.URL}/blogs?search=${search}`).pipe(
            map((res) => {
                let result = res.result.data;
                return new BaseModel(result.items, result.total)
            }),
            catchError(this.handleError)
        );
    }

    searchHomeService(search: string, city: number, district: number, offset: number, limit: number): Observable<BaseModel> {

        let url = this.getUrl([{ name: "search", value: search }, { name: 'city', value: city },
        { name: 'district', value: district }, { name: 'offset', value: offset }, { name: 'limit', value: limit }]);

        return this.http.get<any>(`${this.URL}/agencies/home-service/search${url}`).pipe(
            map((res) => {
                let result = res.result.data;
                return new BaseModel(result.items, result.total)
            }),
            catchError(this.handleError)
        );
    }
}
