import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private _AuthService: AuthService ,private _Router:Router) {}

  registerForm = this.fb.group({
    userName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).*$"),
      ],
    ],
    profilePic: null,
  });

  visible: boolean = false;
  changetype: boolean = true;
  isloading: boolean = false;
  error: string = "";

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  submitRegisterationForm() {
    this.isloading = true;
    // Create a FormData object
    const formData = new FormData();
    // Append form values to the FormData object
    formData.append('userName', this.registerForm.get('userName')?.value || '');
    formData.append('firstName', this.registerForm.get('firstName')?.value || '');
    formData.append('lastName', this.registerForm.get('lastName')?.value || '');
    formData.append('email', this.registerForm.get('email')?.value || '');
    formData.append('password', this.registerForm.get('password')?.value || '');
    

    // Append the profile picture if selected
    /* const profilePic = this.registerForm.get('profilePic')?.value;
    if (profilePic) {
      formData.append('profilePic', profilePic);
    } */
    
    this._AuthService.Register(formData).subscribe({
      next: (res) => {
        this.isloading = false;
        if (res.ok ) {
          console.log(res.data.userId);
          //this._AuthService.saveUserData();
          // Navigate to login page
          this._Router.navigate(['/login']);

        } else {
          this.error = res.message;
        }
      },
      error: (ero) => {
        this.error = ero.error.message;
      },
    });
  }
}