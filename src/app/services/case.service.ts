import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private _addCaseUrl = 'http://localhost:3000/api/claimant';
  private _caseByIdUrl = 'http://localhost:3000/api/claimant/';
  private _addDefendantUrl = 'http://localhost:3000/api/claimant/defendant/';
  private _addWitnessUrl = 'http://localhost:3000/api/claimant/witness/';
  private _addLawyerUrl = 'http://localhost:3000/api/claimant/lawyer/';
  private _addProgressrUrl = 'http://localhost:3000/api/claimant/case-progress/';
  private _getCaseByPhoneUrl = 'http://localhost:3000/api/case/case-id';
  private _closeFileUrl = 'http://localhost:3000/api/claimant/close-file/';
  constructor(private http: HttpClient) { }
  addCase(caseapp) {
    return this.http.post<any>(this._addCaseUrl, caseapp);
  }
  getCaseById(id) {
    return this.http.get<any>(this._caseByIdUrl + id);
  }
  addDefendant(id, defendant) {
   return this.http.put<any>(this._addDefendantUrl + id, defendant);
  }
  addWitness(id, witness) {
   return this.http.put<any>(this._addWitnessUrl + id, witness);
  }
  addLawyer(id, lawyer) {
  return  this.http.put<any>(this._addLawyerUrl + id, lawyer);
  }
  addCaseProgress(id, progress) {
    return  this.http.put<any>(this._addProgressrUrl + id, progress);
  }
  getCaseByPhone(phone) {
    return  this.http.post<any>(this._getCaseByPhoneUrl, phone);
  }
  addCloseFile(id, details) {
    return  this.http.put<any>(this._closeFileUrl + id, details);
  }
}
