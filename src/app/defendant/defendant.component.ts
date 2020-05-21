import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CaseService} from '../services/case.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-defendant',
  templateUrl: './defendant.component.html',
  styleUrls: ['./defendant.component.css']
})
export class DefendantComponent implements OnInit {
public defendantForm;
public defendant;
public caseId;
public success = false;
constructor(private formBuilder: FormBuilder, private caseService: CaseService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.caseId = params.get('id');
      console.log(this.caseId);
    })
    this.createForm();
  }
createForm() {
    this.defendantForm = this.formBuilder.group({
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        middle_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(3)]],
        gender: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      });
}
 get firstName() {
      return this.defendantForm.get('first_name');
  }
 get middleName() {
    return this.defendantForm.get('middle_name');
  }
 get lastName() {
    return this.defendantForm.get('last_name');
  }
get  gender() {
    return this.defendantForm.get('gender');
  }
  get address() {
    return this.defendantForm.get('address');
  }
 get phone() {
    return this.defendantForm.get('phone');
  }
  onAddDefendant(defendant) {
    this.caseService.addDefendant(this.caseId, defendant).subscribe(res => {
      console.log(res);
      this.defendant = res;
      this.success = true;
      this.defendantForm.reset();
    }, error => {
      console.log(error);
    });
  }
}
