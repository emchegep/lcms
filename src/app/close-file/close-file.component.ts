import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CaseService} from '../services/case.service';

@Component({
  selector: 'app-close-file',
  templateUrl: './close-file.component.html',
  styleUrls: ['./close-file.component.css']
})
export class CloseFileComponent implements OnInit {
  public closeFileForm;
  private caseId;
  private closeFileDetails;
  public success = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private caseService: CaseService) {
  }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.caseId = params.get('id');
      console.log(this.caseId);
    });
    this.createForm();
  }

  createForm() {
    this.closeFileForm = this.formBuilder.group({
      judgement: ['', [Validators.required]],
      status: ['false'],
    });
  }

  get judgement() {
    return this.closeFileForm.get('judgement');
  }
  onAddCloseFile(details) {
    this.caseService.addCloseFile(this.caseId, details).subscribe(res => {
      console.log(res);
      this.closeFileDetails = res;
      this.success = true;
      this.closeFileForm.reset();
    }, error => {
      console.log(error);
    });
  }
}
