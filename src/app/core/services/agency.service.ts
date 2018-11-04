import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseModel } from '@app/core/models/base.model';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from '@app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AgencyService extends BaseService {

  getAll(): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/agencies/real-estate`).pipe(
      map((res) => {
        let result = res.result.data;
        return new BaseModel(result.items, result.total)
      }),
      catchError(this.handleError)
    );
  }

  getDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/agencies/real-estate/${id}`).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }
}
