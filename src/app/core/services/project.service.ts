import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Project } from '@app/core/models/project';
import { BaseModel } from '@app/core/models/base.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService {

  getAll(): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/projects`).pipe(
      map((res) => {
        let result = res.result.data;
        return new BaseModel(result.items, result.total)
      }),
      catchError(this.handleError)
    );
  }

  getDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/projects/${id}`).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  getByOffset(offset, limit): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/projects?offset=${offset}&limit=${limit}`).pipe(
      map((res) => {
        let result = res.result.data;
        return new BaseModel(result.items, result.total)
      }),
      catchError(this.handleError)
    );
  }
}
