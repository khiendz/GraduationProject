import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Acount, TaiKhoan } from '../models/TaiKhoan.model';
@Injectable({
  providedIn: 'root'
})
export class ManageUser {

  constructor(public http:HttpClient) { }
  readonly urlAPI ="http://localhost:44344/api";

  getAll():Observable<TaiKhoan[]>
  {
    return this.http.get<TaiKhoan[]>(`/manageuser/get-all`);
  }

  getListUser():Observable<Acount[]>
  {
    return this.http.get<Acount[]>(`/manageuser/get-all-user`);
  }

  getUserByUserName(id:string):Observable<any>
  {
    let reques = (`/manageuser/get-detail/${id}`);
    return this.http.get<any>(reques);
  }

  removed(id:any)
  {
    return this.http.delete(`/manageuser/delete/${id}`)
  }
  removed2(Employee:TaiKhoan)
  {
    return this.http.post(`/authenticate/delete-user`,Employee);
  }

  update(id:any, Employee:TaiKhoan)
  {
    return this.http.post(`/manageuser/update/${id}`,Employee);
  }
  update2(Employee:TaiKhoan)
  {
    return this.http.post(`/authenticate/update-user`,Employee);
  }
  add(Employee:TaiKhoan)
  {
    return this.http.post(`/manageuser/create`,Employee);
  }
  add2(Employee:TaiKhoan)
  {
    return this.http.post(`/authenticate/register`,Employee);
  }
}
