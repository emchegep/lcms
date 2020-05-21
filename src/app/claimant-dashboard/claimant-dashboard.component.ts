import { Component, OnInit } from '@angular/core';
import {ClaimantService} from '../services/claimant.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-claimant-dashboard',
  templateUrl: './claimant-dashboard.component.html',
  styleUrls: ['./claimant-dashboard.component.css']
})
export class ClaimantDashboardComponent implements OnInit {
public currentClaimant;
public witnesses;
public defendants;
  constructor(private claimantService: ClaimantService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCurrentClaimant();
  }
  showMyCase() {
    this.router.navigate(['my-case'], {relativeTo: this.route});
  }
  showMyDefendant() {
    this.router.navigate(['my-defendant'], {relativeTo: this.route});
  }
  showMyWitness() {
    this.router.navigate(['my-witness'], {relativeTo: this.route});
  }
  showProfile() {
    this.router.navigate(['claimant-profile'], {relativeTo: this.route});
  }
  showSettings() {
    this.router.navigate(['reset-password'], {relativeTo: this.route});
  }
  getCurrentClaimant() {
    this.claimantService.getLoggedInClaimant().subscribe(claimant => {
      console.log(claimant);
      this.currentClaimant = claimant;
      this.totalWitnesses();
      this.totalDefendants();
    }, error => {
      console.log(error);
    });
  }
  totalWitnesses() {
    this.claimantService.getTotalWitnesses(this.currentClaimant._id).subscribe(res => {
      console.log(res);
      if (res) {
        this.witnesses = res;
      } else {
        this.witnesses = { total_witness: 0};
      }
    }, error => {
      console.log(error);
    });
  }
  totalDefendants() {
    this.claimantService.getTotalDefendants( this.currentClaimant._id).subscribe(res => {
      console.log(res);
      if (res) {
        this.defendants = res;
      } else {
        this.defendants = { total_defendant: 0};
      }
    }, error => {
      console.log(error);
    });
  }
}
