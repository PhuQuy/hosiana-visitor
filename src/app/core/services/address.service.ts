import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { BaseModel } from '@app/core/models/base.model';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService{

  getDistricts(): Observable<BaseModel> {
    return this.http.get<any>(`${this.URL}/districts`).pipe(
      map((res) => {
        let result = res.result.data;
        return new BaseModel(result.items, result.total)
      }),
      catchError(this.handleError)
    ); 
  }

  getCities() {
    return this.http.get<any>(`${this.URL}/cities`).pipe(
      map((res) => {
        let result = res.result.data;
        return new BaseModel(result.items, result.total)
      }),
      catchError(this.handleError)
    ); 
  }
}
