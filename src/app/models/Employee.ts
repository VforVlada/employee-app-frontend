import { Department } from "./Department";

export interface Employee {
    id?: number;
    departmentId?: number;
    managerId?: number;
    name: string;
    salary?: number;
    manager: Employee;
    department: Department;
}