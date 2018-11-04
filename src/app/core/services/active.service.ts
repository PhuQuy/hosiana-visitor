import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseModel } from '@app/core/models/base.model';
import { BaseService } from '@app/core/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class ActiveService extends BaseService {
    active(id: number): Observable<any> {
        return this.http.get<any>(`${this.URL}/users/active/${id}`).pipe(
            map((res) => res.result.data),
            catchError(this.handleError)
        );
    }
}
