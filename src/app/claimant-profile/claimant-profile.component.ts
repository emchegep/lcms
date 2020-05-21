import { Component, OnInit } from '@angular/core';
import {ClaimantService} from '../services/claimant.service';

@Component({
  selector: 'app-claimant-profile',
  templateUrl: './claimant-profile.component.html',
  styleUrls: ['./claimant-profile.component.css']
})
export class ClaimantProfileComponent implements OnInit {
  public myCase;
  constructor(private claimantService: ClaimantService) { }

  ngOnInit() {
    this.claimantService.getLoggedInClaimant().subscribe(res => {
      this.myCase =  res;
      console.log(res);
    }, error => {
      console.log(error);
    });
  }


}
