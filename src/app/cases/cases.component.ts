import { Component, OnInit } from '@angular/core';
import {ClaimantService} from '../services/claimant.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
public cases = [];
  constructor(private claimantService: ClaimantService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.onGetCases();
  }
  onGetCases() {
    this.claimantService.getClaimants().subscribe(data => {
        console.log(data);
        this.cases = data;
      },
      error => {
        console.log(error);
      });
  }
  onSelect(mycase) {
    console.log(mycase._id);
    this.router.navigate(['../case', mycase._id],{relativeTo: this.route});
}
}
