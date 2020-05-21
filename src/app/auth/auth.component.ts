import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
public loginForm;
public loginError = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
}
get email() {
   return this.loginForm.get('email');
}
get password() {
 return this.loginForm.get('password');
}
onLogin(user) {
    this.authService.logIn(user).subscribe(res => {
      console.log(res);
      this.loginError = false;
      localStorage.setItem('token', res.token);
      this.router.navigate(['/admin-dashboard']);
    }, error => {
      this.loginError = true;
      console.log(error);
    });
}
onrRegister(user) {
    this.authService.registerUser(user).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
}
}
