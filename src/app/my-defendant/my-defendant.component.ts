import { Component, OnInit } from '@angular/core';
import {ClaimantService} from '../services/claimant.service';

@Component({
  selector: 'app-my-defendant',
  templateUrl: './my-defendant.component.html',
  styleUrls: ['./my-defendant.component.css']
})
export class MyDefendantComponent implements OnInit {
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
