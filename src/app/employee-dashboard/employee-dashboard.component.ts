import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit{

  formValue !: FormGroup;
  showAdd !: boolean;
  showUpdate !: boolean;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData: any;
  constructor(private formBuilder :FormBuilder,private api:ApiService){

  }

  ngOnInit(){
    this.formValue = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
      emailId : [''],
      mobileNo : [''],
      salary : ['']  
  })
  this.getAllEmployees()
 }

 clickAddEmployee(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate = false;

 }

  postEmployeeDetails(){
  
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.emailId = this.formValue.value.emailId;
    this.employeeModelObj.mobileNo = this.formValue.value.mobileNo;
    this.employeeModelObj.salary = this.formValue.value.salary;
  
      this.api.postEmployee(this.employeeModelObj).subscribe(res =>{
        console.log(res)
        alert("employee added successfully")
        let ref = document.getElementById('cancel')
        ref?.click()
        this.formValue.reset()
        this.getAllEmployees()
      },
      error=>{
        console.log(JSON.stringify(error))
        alert("something went wrong")
      })
  }
  getAllEmployees(){
    this.api.getAllEmployee().subscribe(
      res=>{
      this.employeeData = res;
      }
    )
  }
  deleteEmp(row:any){
    this.api.deleteEmployee(row.id).subscribe(
      res=>{
        alert("employee deleted")
        this.getAllEmployees()
      }
    )
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['emailId'].setValue(row.emailId);
    this.formValue.controls['mobileNo'].setValue(row.mobileNo);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.emailId = this.formValue.value.emailId;
    this.employeeModelObj.mobileNo = this.formValue.value.mobileNo;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(
      res=>{
        alert("updated successfully")
        let ref = document.getElementById('cancel')
        ref?.click()
        this.formValue.reset()
        this.getAllEmployees()
      }
    )

  }

}
