import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseModel } from '@app/core/models/base.model';

@Injectable({
  providedIn: 'root'
})
export class CommercialService extends BaseService {

  getAll(): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/listings?type=2`).pipe(
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

  getByOffset(serviceType, offset, limit): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/listings?serviceType=${serviceType}&offset=${offset}&limit=${limit}`).pipe(
      map((res) => {
        let result = res.result.data;
        return new BaseModel(result.items, result.total)
      }),
      catchError(this.handleError)
    );
  }
}
