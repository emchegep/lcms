import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClaimantService {
private _getClaimantsUrl = 'http://localhost:3000/api/claimants';
  private _getClosedCasesUrl = 'http://localhost:3000/api/closed-cases';
  private _totalClaimantsUrl = 'http://localhost:3000/api/claimants/all';
  private loginClaimantUrl = 'http://localhost:3000/api/claimant/login';
  private currentClaimantUrl = 'http://localhost:3000/api/claimant';
  private changePasswordUrl = 'http://localhost:3000/api/claimant/reset-password/';
  private totalWitnessesUrl = 'http://localhost:3000/api/claimant/total-witness/';
  private totalDefendantsUrl = 'http://localhost:3000/api/claimant/total-defendant/';
  private _totalClosedCasesUrl = 'http://localhost:3000/api/claimants/total-closed';
  constructor(private http: HttpClient, private router: Router) { }
  getClaimants() {
    return this.http.get<any>(this._getClaimantsUrl);
  }
  getClosedCases() {
    return this.http.get<any>(this._getClosedCasesUrl);
  }
  getTotalClaimants() {
    return this.http.get<any>(this._totalClaimantsUrl);
  }
  logIn(claimant) {
    return this.http.post<any>(this.loginClaimantUrl, claimant);
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/claimant-login']);
  }
  getLoggedInClaimant() {
    return this.http.get<any>(this.currentClaimantUrl);
  }
  changePassword(id, claimant) {
    return this.http.put<any>(this.changePasswordUrl + id, claimant);
  }
  getTotalWitnesses(id) {
    return this.http.get<any>(this.totalWitnessesUrl + id);
  }
  getTotalDefendants(id) {
    return this.http.get<any>(this.totalDefendantsUrl + id);
  }
  getTotalClosedCases() {
    return this.http.get<any>(this._totalClosedCasesUrl);
  }
}
