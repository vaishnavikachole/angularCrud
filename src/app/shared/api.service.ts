import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

 
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  
  url = 'http://localhost:3000/employees/';

  postEmployee(data : any){
    return this.http.post<any>(this.url, data)
    .pipe(map((res : any)=>{
      console.log(JSON.stringify(res[0]))
      return res;
  }))
    
  }

  getAllEmployee(){
    return this.http.get<any>(this.url)
    .pipe(map((res:any)=>{
      return res;
    }))
}
updateEmployee(data:any,id:number){
return this.http.put<any>(this.url+id,data)
.pipe(map((res:any)=>{
  return res;
}))
}

deleteEmployee(id:number){
  return this.http.delete<any>(this.url+id)
  .pipe(map((res:any)=>{
      return res;
    }
  ))
}
}
