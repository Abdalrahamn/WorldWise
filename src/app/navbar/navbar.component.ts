import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private _AuthService:AuthService){}
  isLoggin:boolean = false;
  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:()=>{
        if (this._AuthService.userData.getValue() != null){ this.isLoggin = true;}
        else{ this.isLoggin = false}
      }
    });
    
  }
  logOut(){
    this._AuthService.logOut();
  }

}
