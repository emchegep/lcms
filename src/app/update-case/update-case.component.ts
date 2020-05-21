import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CaseService} from '../services/case.service';

@Component({
  selector: 'app-update-case',
  templateUrl: './update-case.component.html',
  styleUrls: ['./update-case.component.css']
})
export class UpdateCaseComponent implements OnInit {
public case_id;
public myCase;
  constructor(private route: ActivatedRoute, private caseService: CaseService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.case_id = id;
    })
    this.caseById(this.case_id);
  }
caseById(id) {
    this.caseService.getCaseById(id).subscribe(res => {
      console.log(res);
      this.myCase = res;
    }, error => {
      console.log(error);
    });
}
defendant(mycase) {
    this.router.navigate(['defendant'], {relativeTo: this.route});
}
  witness() {
    this.router.navigate(['witness'], {relativeTo: this.route});
  }
  lawyer() {
    this.router.navigate(['lawyer'], {relativeTo: this.route});
  }
  caseProgress() {
    this.router.navigate(['case-progress'], {relativeTo: this.route});
  }
  closeFile() {
    this.router.navigate(['close-file'], {relativeTo: this.route});
  }
}
