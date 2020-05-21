import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CaseService} from '../services/case.service';

@Component({
  selector: 'app-witness',
  templateUrl: './witness.component.html',
  styleUrls: ['./witness.component.css']
})
export class WitnessComponent implements OnInit {
  public witnessForm;
  private caseId;
  private witness;
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
    this.witnessForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      middle_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }
  get firstName() {
    return this.witnessForm.get('first_name');
  }
  get middleName() {
    return this.witnessForm.get('middle_name');
  }
  get lastName() {
    return this.witnessForm.get('last_name');
  }
  get  gender() {
    return this.witnessForm.get('gender');
  }
  get phone() {
    return this.witnessForm.get('phone');
  }
  onAddWitness(witness) {
    this.caseService.addWitness(this.caseId, witness).subscribe(res => {
      console.log(res);
      this.witness = res;
      this.success = true;
      this.witnessForm.reset();
    }, error => {
      console.log(error);
    });
  }
}
