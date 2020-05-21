import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ClaimantService} from '../services/claimant.service';

@Component({
  selector: 'app-claimant-login',
  templateUrl: './claimant-login.component.html',
  styleUrls: ['./claimant-login.component.css']
})
export class ClaimantLoginComponent implements OnInit {
  public claimantLoginForm;
  public loginError = false;
  constructor(private formBuilder: FormBuilder, private claimantService: ClaimantService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.claimantLoginForm = this.formBuilder.group({
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get phone() {
    return this.claimantLoginForm.get('phone');
  }
  get password() {
    return this.claimantLoginForm.get('password');
  }
  onLogin(claimant) {
    this.claimantService.logIn(claimant).subscribe(res => {
      console.log(res);
      this.loginError = false;
      localStorage.setItem('token', res.token);
      this.router.navigate(['/claimant-dashboard']);
    }, error => {
      this.loginError = true;
      console.log(error);
    });
  }
}
