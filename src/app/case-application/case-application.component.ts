import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CaseService} from '../services/case.service';
import {ActivatedRoute, Router} from '@angular/router';
import {passwordValidator} from '../shared/password.validator';

@Component({
  selector: 'app-case-application',
  templateUrl: './case-application.component.html',
  styleUrls: ['./case-application.component.css']
})
export class CaseApplicationComponent implements OnInit {
public caseForm;
public newcase;
public message = false;
  constructor(private formBuilder: FormBuilder, private _case: CaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createCaseForm();
  }
createCaseForm() {
    this.caseForm = this.formBuilder.group({
      name: this.formBuilder.group({
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        middle_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(3)]]
      }),
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
      resident: this.formBuilder.group({
        county: ['', [Validators.required]],
        sub_county: ['', [Validators.required]],
        town: ['', [Validators.required, Validators.minLength(3)]],
      }),
      case: this.formBuilder.group({
        case_type: ['', Validators.required],
        case_description: ['', [Validators.required, Validators.min(10)]],
        court: this.formBuilder.group({
          station: ['', Validators.required],
          level: ['', Validators.required],
          court_no: ['', [Validators.required]]
        })
      })
    }, {validator: passwordValidator});
}
  get firstName() {
    return this.caseForm.get('name.first_name');
}
  get middleName() {
    return this.caseForm.get('name.middle_name');
  }
  get lastName() {
    return this.caseForm.get('name.last_name');
  }
  get phone() {
    return this.caseForm.get('phone');
  }
  get email() {
    return this.caseForm.get('email');
  }
  get password() {
    return this.caseForm.get('password');
  }
  get confirmPassword() {
    return this.caseForm.get('confirm_password');
  }
  get county() {
    return this.caseForm.get('resident.county');
  }
  get subCounty() {
    return this.caseForm.get('resident.sub_county');
  }
  get town() {
    return this.caseForm.get('resident.town');
  }
  get caseDescription() {
    return this.caseForm.get('case.case_description');
  }
  get courtStation() {
    return this.caseForm.get('case.court.station');
  }
  get courtLevel() {
    return this.caseForm.get('case.court.level');
  }
  get courtNo() {
    return this.caseForm.get('case.court.court_no');
  }
  get caseType() {
    return this.caseForm.get('case.case_type');
  }
onAddCase(caseapp) {
    console.log(caseapp);
    this._case.addCase(caseapp).subscribe(res => {
      console.log(res);
      if (res) {
        this.message = true;
        this.caseForm.reset();
       // this.router.navigate(['../cases'],{ relativeTo: this.route });
      } else {
        this.message = false;
      }
    },
      error => {
      console.log(error);
      });
}
}
