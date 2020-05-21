import { Component, OnInit } from '@angular/core';
import {ClaimantService} from '../services/claimant.service';

@Component({
  selector: 'app-my-witness',
  templateUrl: './my-witness.component.html',
  styleUrls: ['./my-witness.component.css']
})
export class MyWitnessComponent implements OnInit {
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
