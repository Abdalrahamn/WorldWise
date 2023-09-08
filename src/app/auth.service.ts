import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient , private _Router:Router ,private _ToastrService:ToastrService) { 
    if (localStorage.getItem('token') != null) {
      this.saveUserData();
    }
  }

  userData:any = new BehaviorSubject(null);

  saveUserData(){
    let Data = JSON.stringify(localStorage.getItem('token'));
    this.userData.next(Data);
  }

  logOut(){
    localStorage.removeItem('token');
    this.userData.next(null);
    this._Router.navigate(['/login']);
    this._ToastrService.success('Logged Out Successfully');
  }

  Register(userData:FormData):Observable<any>{

    const headers = new HttpHeaders();

    return this._HttpClient.post('https://worldwiseapi.somee.com/api/users/register', userData , { headers,});
  }
  Login(userData:object):Observable<any>{

    const headers = new HttpHeaders();

    return this._HttpClient.post('https://worldwiseapi.somee.com/api/users/login', userData );
  }
}
