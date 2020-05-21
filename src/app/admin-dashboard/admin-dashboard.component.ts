import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ClaimantService} from '../services/claimant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {CaseService} from '../services/case.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
public currentUser;
public totalClaimants = [];
  public totalClosed = [];
public searchForm;
public searchedCase;
constructor(
  private authService: AuthService,
  private claimantService: ClaimantService,
  private router: Router,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder,
  private caseService: CaseService) { }

  ngOnInit() {
    this.createSearchForm();
    /*current user*/
    this.authService.getLoggedInUser().subscribe(user => {
      console.log(user);
      this.currentUser = user;
    },
      error => {
      console.log(error);
      });
    /*total claimants*/
    this.claimantService.getTotalClaimants().subscribe(total => {
      console.log(total);
      this.totalClaimants = total;
    },
      error => {
      console.log(error);
    });
    /*total closed cases*/
    this.claimantService.getTotalClosedCases().subscribe(total => {
        console.log(total);
        this.totalClosed = total;
      },
      error => {
        console.log(error);
      });
  }
  showDashboard() {
    this.router.navigate(['admin-dashboard']);
  }
  showCaseApplication() {
  this.router.navigate(['case-application'], {relativeTo: this.route});
  }
  showClaimants() {
    this.router.navigate(['claimants'], {relativeTo: this.route});
  }
  showCases() {
    this.router.navigate(['cases'], {relativeTo: this.route});
  }
  showClosedCases() {
    this.router.navigate(['closed-cases'], {relativeTo: this.route});
  }
  showProfile() {
    this.router.navigate(['profile'], {relativeTo: this.route});
  }
  showAdminResetPassword() {
    this.router.navigate(['reset-password'], {relativeTo: this.route});
  }
  showNewUser() {
    this.router.navigate(['new-user'], {relativeTo: this.route});
  }
  claimantsCard() {
    this.router.navigate(['../admin-dashboard', 'claimants'],{ relativeTo: this.route});
  }
  casesCard() {
    this.router.navigate(['../admin-dashboard', 'cases'],{ relativeTo: this.route});
  }
  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      phone: ['', Validators.required]
    });
  }
  onSearchCase(phone) {
    this.caseService.getCaseByPhone(phone).subscribe(res => {
      console.log(res);
      this.searchedCase = res;
    }, error => {
      console.log(error);
    });
  }
}
