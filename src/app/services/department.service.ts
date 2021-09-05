import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Department } from '../models/Department';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  public actionUrl = 'http://localhost:5050/api/departments';

  constructor(private _http: HttpClient) { }

  public getDepartments(): Observable<Department[]> {
    return this._http.get<Department[]>(this.actionUrl).pipe(
      catchError(this.handleError<Department[]>([]))
    );
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      Swal.fire('Error', error.error, 'error')

      return of(result as T);
    };
  }
}
