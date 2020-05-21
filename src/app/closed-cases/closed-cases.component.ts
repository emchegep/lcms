import { Component, OnInit } from '@angular/core';
import {ClaimantService} from '../services/claimant.service';

@Component({
  selector: 'app-closed-cases',
  templateUrl: './closed-cases.component.html',
  styleUrls: ['./closed-cases.component.css']
})
export class ClosedCasesComponent implements OnInit {
  public closedCases = [];
  constructor(private claimantService: ClaimantService) { }

  ngOnInit() {
    this.onGetClosedCases();
  }
  onGetClosedCases() {
    this.claimantService.getClosedCases().subscribe(data => {
        console.log(data);
        this.closedCases = data;
      },
      error => {
        console.log(error);
      });
  }
}
