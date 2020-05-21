import { Component, OnInit } from '@angular/core';
import {ClaimantService} from '../services/claimant.service';
import {CaseService} from '../services/case.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public myCase;
  public success;
  public searchedCase;
  public searchForm;
  public message;
  constructor(private claimantService: ClaimantService,
              private caseService: CaseService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.claimantService.getLoggedInClaimant().subscribe(res => {
      this.myCase =  res;
      console.log(res);
    }, error => {
      console.log(error);
    });
    this.createSearchForm();
  }
  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      phone: ['', Validators.required]
    });
  }
  onSearchCase(phone) {
    this.caseService.getCaseByPhone(phone).subscribe(res => {
      console.log(res);
      if (res.length !== 0) {
        this.searchedCase = res;
        this.success = true;
        this.searchForm.reset();
      } else {
        this.success = false;
        this.message = {message: 'Case not Found'};
        this.searchForm.reset();
      }
    }, error => {
      console.log(error);
    });
  }
  onSelect(mycase) {
    console.log(mycase._id);
    this.router.navigate(['../case', mycase._id],{relativeTo: this.route});
  }
}
