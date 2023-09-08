import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue() != null) {
          this._Router.navigate(['/home']);
        }
      },
    });
  }

  loginForm = this.fb.group({
    userName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*d)(?=.*[^A-Za-zd]).*$'),
    ]),
  });

  visible: boolean = false;
  changetype: boolean = true;
  isloading: boolean = false;
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  error: string = '';

  submitLoginForm(loginForm: FormGroup) {
    this.isloading = true;
    this._AuthService.Login(loginForm.value).subscribe({
      next: (res) => {
        this.isloading = false;
        if (res.ok) {
          localStorage.setItem('token',res.data.userId);
          this._AuthService.saveUserData();
          this._Router.navigate(['/home']);
          console.log(`Logged`);
          this._toastr.success('Already logged in')
        }
      },
      error: (ero) => {
        this.isloading = false;
        this.error = ero.error.message;
        //this._toastr.error(ero.error.message);
      },
    });
  }
}
