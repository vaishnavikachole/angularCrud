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
  employeeModelObj : EmployeeModel = new EmployeeModel();
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
        this.formValue.reset()
      },
      error=>{
        console.log(JSON.stringify(error))
        alert("something went wrong")
      })
  }

}
