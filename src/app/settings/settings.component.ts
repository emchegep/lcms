import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ClaimantService} from '../services/claimant.service';
import {passwordValidator} from '../shared/password.validator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
private myCase;
public resetPasswordForm;
public changedPassword;
  public success = false;
  constructor(private fb: FormBuilder, private claimantService: ClaimantService, private router: Router) { }

  ngOnInit() {
    this.claimantService.getLoggedInClaimant().subscribe(res => {
      this.myCase = res;
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
  onChangePassword(claimant) {
    console.log(this.myCase._id);
    this.claimantService.changePassword(this.myCase._id, claimant).subscribe(res => {
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
