import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseModel } from '@app/core/models/base.model';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from '@app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService extends BaseService {

  getAll(): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/agencies/home-service`).pipe(
      map((res) => {
        let result = res.result.data;
        return new BaseModel(result.items, result.total)
      }),
      catchError(this.handleError)
    );
  }

  getDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/agencies/home-service/${id}`).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  getByOffset(offset, limit): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/agencies/home-service?offset=${offset}&limit=${limit}`).pipe(
      map((res) => {
        let result = res.result.data;
        return new BaseModel(result.items, result.total)
      }),
      catchError(this.handleError)
    );
  }

}
