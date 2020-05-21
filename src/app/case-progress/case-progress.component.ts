import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {CaseService} from '../services/case.service';

@Component({
  selector: 'app-case-progress',
  templateUrl: './case-progress.component.html',
  styleUrls: ['./case-progress.component.css']
})
export class CaseProgressComponent implements OnInit {
  public progressForm;
  private caseId;
  private progress;
  public success = false;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private caseService: CaseService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.caseId = params.get('id');
      console.log(this.caseId);
    });
    this.createForm();
  }
  createForm() {
    this.progressForm = this.formBuilder.group({
      stage: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }
  get stage() {
    return this.progressForm.get('stage');
  }
  get date() {
    return this.progressForm.get('date');
  }
  onAddCaseProgress(progress) {
    this.caseService.addCaseProgress(this.caseId, progress).subscribe(res => {
      console.log(res);
      this.progress = res;
      this.success = true;
      this.progressForm.reset();
    }, error => {
      console.log(error);
    });
  }


}
