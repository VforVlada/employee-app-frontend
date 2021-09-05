import { ConditionalExpr } from '@angular/compiler';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/models/Department';
import { Employee } from 'src/app/models/Employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public action:string;
  public localData:any;
  public departments: Department[] = [];
  public managers: Employee[] = [];
  
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    private _departmentService: DepartmentService,
    private _employeeService: EmployeeService
  ) { }

  public ngOnInit(): void {
    this.localData = {...this.data};
    this.action = this.localData.action;

    if (this.action != 'Delete')
    {
      this._departmentService.getDepartments().subscribe(data=> this.departments = data);
      this._employeeService.getEmployees().subscribe(data=> {
        this.managers = data.filter(el => el.id != this.localData.id);
      });
    }
  }

  public doAction(){
    var createdEmployee: any = {
      name: this.localData.name,
      salary: this.localData.salary,
      managerId: this.localData.managerId,
      departmentId: this.localData.departmentId
    };

    if (this.localData.id) {
      createdEmployee.id = this.localData.id;
    }

    this.dialogRef.close({
      event: this.action,
      data: createdEmployee
    });
  }

  public closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  public isItemEmpty() {
    return !this.localData.name ||
           !this.localData.salary ||
           !this.localData.managerId ||
           !this.localData.departmentId;
  }
}
