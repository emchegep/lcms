import { Component, OnInit } from '@angular/core';
import {ClaimantService} from '../services/claimant.service';


@Component({
  selector: 'app-my-case',
  templateUrl: './my-case.component.html',
  styleUrls: ['./my-case.component.css']
})
export class MyCaseComponent implements OnInit {
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
