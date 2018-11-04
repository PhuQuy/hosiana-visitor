import { Injectable } from '@angular/core';
import { BaseModel } from '@app/core/models/base.model';
import { BaseService } from '@app/core/services/base.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService  {
  getAll(): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/listings/home`).pipe(
      map((res) => res.result.data),
      catchError(this.handleError)
    );
  }

  getFeeds(): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/listings/feed`).pipe(
      map((res) => res.result.data),
      catchError(this.handleError)
    );
  }

  getDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/listings/home${id}`).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  getAgencies(): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/agencies/follows?type=1&limit=3&offset=0`).pipe(
      map((res) => {
        let result = res.result.data;
        return new BaseModel(result.items, result.total)
      }),
      catchError(this.handleError)
    );
  }

  getAgencyMonth(): Observable<any> {
    return this.http.get<any>(`${this.URL}/agencies/agency-month`).pipe(
      map((res) => res.result.data),
      catchError(this.handleError)
    );
  }
}
