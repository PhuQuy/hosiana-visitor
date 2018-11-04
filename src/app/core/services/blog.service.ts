import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseModel } from '@app/core/models/base.model';
import { BaseService } from '@app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseService {

  getAll(): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/blogs`).pipe(
      map((res) => res.result.data),
      catchError(this.handleError)
    );
  }

  getByOffset(offset, limit): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/blogs?offset=${offset}&limit=${limit}`).pipe(
      map((res) => {
        let result = res.result.data;
        return new BaseModel(result.items, result.total)
      }),
      catchError(this.handleError)
    );
  }

  getDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/blogs/${id}`).pipe(
      map((res) => res.result.data),
      catchError(this.handleError)
    );
  }

  getCategories(): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/blogs/categories`).pipe(
      map((res) => {
        let result = res.result.data;
        return new BaseModel(result.items, result.total)
      }),
      catchError(this.handleError)
    );
  }

  getBySlug(offset, limit, slug): Observable<any> {
    return this.http.get<any>(`${this.URL}/blogs/categories/${slug}?offset=${offset}&limit=${limit}`).pipe(
      map((res) => res.result.data),
      catchError(this.handleError)
    );
  }
}
