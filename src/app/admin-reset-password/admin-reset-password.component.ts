import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ClaimantService} from '../services/claimant.service';
import {passwordValidator} from '../shared/password.validator';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-admin-reset-password',
  templateUrl: './admin-reset-password.component.html',
  styleUrls: ['./admin-reset-password.component.css']
})
export class AdminResetPasswordComponent implements OnInit {
  private currentUser;
  public resetPasswordForm;
  public changedPassword;
  public success = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe(res => {
      this.currentUser = res;
    }, error => {
      console.log(error);
    });
    this.createForm();
  }
  createForm() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    }, {validator: passwordValidator});
  }
  get password() {
    return this.resetPasswordForm.get('password');
  }
  get confirmPassword() {
    return this.resetPasswordForm.get('confirm_password');
  }
  onChangePassword(user) {
    console.log(this.currentUser._id);
    this.authService.changePassword(this.currentUser._id, user).subscribe(res => {
      console.log(res);
      if (res) {
        this.changedPassword = res;
        this.success = true;
        this.resetPasswordForm.reset();
      } else {
        this.success = false;
      }
    }, error => {
      console.log(error);
    });
  }
}
