import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  public employees: Employee[];

  public displayedColumns: string[] = ['name', 'salary', 'department', 'manager', 'action'];

  public dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  
  constructor(
    private dialog: MatDialog,
    private _employeeService: EmployeeService
  ) { }

  public ngOnInit(): void {
    this._employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.dataSource = new MatTableDataSource<Employee>(this.employees);
      this.dataSource.paginator = this.paginator;
    });
  }

  public openDialog(action: any,obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: action == 'Delete' ? '180px' : '450px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  public addRowData(employee: any) {
    this._employeeService.addEmployee(employee).pipe(
      mergeMap(() => this._employeeService.getEmployees())
    ).subscribe(data => {
      this.dataSource.data = data
    });
  }
    
  public updateRowData(employee: any){
    this._employeeService.updateEmployee(employee).pipe(
      mergeMap(() => this._employeeService.getEmployees())
    ).subscribe(data => {
      this.dataSource.data = data
    });
  }

  public deleteRowData(employee: any){
    this._employeeService.deleteEmployee(employee.id).pipe(
      mergeMap(() => this._employeeService.getEmployees())
    ).subscribe(data => {
      this.dataSource.data = data
    });
  }
}