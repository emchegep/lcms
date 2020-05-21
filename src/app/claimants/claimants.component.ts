import { Component, OnInit } from '@angular/core';
import {ClaimantService} from '../services/claimant.service';

@Component({
  selector: 'app-claimants',
  templateUrl: './claimants.component.html',
  styleUrls: ['./claimants.component.css']
})
export class ClaimantsComponent implements OnInit {
public claimants = [];
  constructor(private claimantService: ClaimantService) { }

  ngOnInit() {
    this.onGetClaimants();
  }
onGetClaimants() {
    this.claimantService.getClaimants().subscribe(data => {
      console.log(data);
      this.claimants = data;
    },
      error => {
      console.log(error);
      });
}
}
