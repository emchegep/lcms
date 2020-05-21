import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {CaseService} from '../services/case.service';

@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
  styleUrls: ['./lawyer.component.css']
})
export class LawyerComponent implements OnInit {
  public lawyerForm;
  private caseId;
  private lawyer;
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
    this.lawyerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', [Validators.required]],
      organization: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  get firstName() {
    return this.lawyerForm.get('first_name');
  }
  get lastName() {
    return this.lawyerForm.get('last_name');
  }
  get phone() {
    return this.lawyerForm.get('phone');
  }
  get  address() {
    return this.lawyerForm.get('address');
  }
  get organization() {
    return this.lawyerForm.get('organization');
  }
  onAddLawyer(lawyer) {
    this.caseService.addLawyer(this.caseId, lawyer).subscribe(res => {
      console.log(res);
      this.lawyer = res;
      this.success = true;
      this.lawyerForm.reset();
    }, error => {
      console.log(error);
    });
  }

}
