import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators'; 
import { Employee } from '../models/Employee';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public actionUrl = 'http://localhost:5050/api/employees';

  constructor(private _http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(this.actionUrl).pipe(
      catchError(this.handleError<Employee[]>([]))
    );
  }

  public addEmployee(employee:Employee): Observable<Employee> {
    return this._http.post<Employee>(this.actionUrl, employee).pipe(
      catchError(this.handleError<Employee>())
    );
  }

  public updateEmployee(employee: any): Observable<Employee>{
    return this._http.put<Employee>(`${this.actionUrl}/${employee.id}`, employee).pipe(
      catchError(this.handleError<Employee>())
    );
  }

  public deleteEmployee(id: any): Observable<Employee>{
    return this._http.delete<Employee>(`${this.actionUrl}/${id.toString()}`).pipe(
      catchError(this.handleError<Employee>())
    );
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      let errorMessage = error.error;
      if (error.status === 0 || error.status === 500) {
        errorMessage = "Can't connect to the server. Server is unavailable"
      }
      Swal.fire('Error', errorMessage, 'error')

      return of(result as T);
    };
  }
}
