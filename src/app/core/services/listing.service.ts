import { Injectable } from '@angular/core';
import { BaseModel } from '@app/core/models/base.model';
import { BaseService } from '@app/core/services/base.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ListingService extends BaseService {

    getAll(): Observable<BaseModel> {
        return this.http.get<any>(`${this.URL}/listings`).pipe(
            map((res) => {
                let result = res.result.data;
                return new BaseModel(result.items, result.total)
            }),
            catchError(this.handleError)
        );
    }

    getSearchs(serviceType, offset, limit, area?, fromPrice?, toPrice?, bedroom?, type?, place?,
        bathroom?, newMarket?, discount?, landArea?, facility?: string): Observable<BaseModel> {
        return this.http.get<any>(`${this.URL}/listings?serviceType=${serviceType}${place ? '&search=' + place : ''}${area ? '&area=' + area : ''}${fromPrice ? '&fromPrice=' + fromPrice : ''}${toPrice ? '&toPrice=' + toPrice : ''}${bedroom ? '&bedroom=' + bedroom : ''}${type ? '&type=' + type : ''}${bathroom ? '&bathroom=' + bathroom : ''}${newMarket ? '&newMarket=' + newMarket : ''}${discount ? '&discount=' + discount : ''}${landArea ? '&landArea=' + landArea : ''}${facility ? '&facility=' + facility : ''}&offset=${offset}&limit=${limit}`).pipe(
            map((res) => {
                let result = res.result.data;
                return new BaseModel(result.items, result.total)
            }),
            catchError(this.handleError)
        );
    }

    filters(params: {
        type: any,
        serviceType: number,
        offset: number,
        limit: number,
        category?: any,
        city?: any,
        district?: any,
        project?: any,
        minPrice?: number,
        maxPrice?: number,
        bedroom?: number,
        bathroom?: number,
        market?: boolean,
        discount?: boolean,
        minArea?: number,
        maxArea?: number,
        minLandArea?: number,
        maxLandArea?: number,
        facility?: string,
        currency?: string,
        sortBy: string
    }): Observable<BaseModel> {

        params = Object.assign({
            type: null,
            serviceType: 1,
            offset: 0,
            limit: 0,
            category: null,
            city: null,
            district: null,
            project: null,
            minPrice: null,
            maxPrice: null,
            bedroom: null,
            bathroom: null,
            market: null,
            discount: null,
            minArea: null,
            maxArea: null,
            minLandArea: null,
            maxLandArea: null,
            facility: null,
            currency: null,
            sortBy: 'updated-ASC'
        }, params);

        // const query = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
        let routes = '';
        Object.keys(params).map((key) => {
            if (params[key]) {
                routes += `${key}=${params[key]}&`;
            }
        });
        routes = routes.slice(0, routes.length - 1);
        return this.http.get<any>(`${this.URL}/listings/search?${routes}`).pipe(
            map((res) => {
                let result = res.result.data;
                return new BaseModel(result.items, result.total)
            }),
            catchError(this.handleError)
        );
    }

    getCommercials(offset, limit, serviceType?, area?, fromPrice?, toPrice?, bedroom?, type?, place?,
        bathroom?, newMarket?, discount?, landArea?, facility?: string): Observable<BaseModel> {
        return this.http.get<any>(`${this.URL}/listings?type=2${serviceType ? '&serviceType=' + serviceType : ''}${place ? '&search=' + place : ''}${area ? '&area=' + area : ''}${fromPrice ? '&fromPrice=' + fromPrice : ''}${toPrice ? '&toPrice=' + toPrice : ''}${bedroom ? '&bedroom=' + bedroom : ''}${type ? '&type=' + type : ''}${bathroom ? '&bathroom=' + bathroom : ''}${newMarket ? '&newMarket=' + newMarket : ''}${discount ? '&discount=' + discount : ''}${landArea ? '&landArea=' + landArea : ''}${facility ? '&facility=' + facility : ''}&offset=${offset}&limit=${limit}`).pipe(
            map((res) => {
                let result = res.result.data;
                return new BaseModel(result.items, result.total)
            }),
            catchError(this.handleError)
        );
    }

    getDetail(id: number): Observable<any> {
        return this.http.get<any>(`${this.URL}/listings/${id}`).pipe(
            map((res) => res),
            catchError(this.handleError)
        );
    }
}
