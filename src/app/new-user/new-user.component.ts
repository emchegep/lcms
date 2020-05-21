import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {passwordValidator} from '../shared/password.validator';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  public userForm;
  public message = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.createCaseForm();
  }
  createCaseForm() {
    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      middle_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    }, {validator: passwordValidator});
  }
  get firstName() {
    return this.userForm.get('first_name');
  }
  get middleName() {
    return this.userForm.get('middle_name');
  }
  get lastName() {
    return this.userForm.get('last_name');
  }
  get gender() {
    return this.userForm.get('gender');
  }
  get phone() {
    return this.userForm.get('phone');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  get confirmPassword() {
    return this.userForm.get('confirm_password');
  }
  onAddUser(user) {
    this.authService.registerUser(user).subscribe(res => {
      console.log(res);
      if (res) {
        this.message = true;
        this.userForm.reset();
      } else {
        this.message = false;
      }
    }, error => {
      console.log(error);
    });
  }
}
