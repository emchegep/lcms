import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './guards/auth.guard';
import {ClaimantsComponent} from './claimants/claimants.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CaseApplicationComponent} from './case-application/case-application.component';
import {CasesComponent} from './cases/cases.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {ClaimantLoginComponent} from './claimant-login/claimant-login.component';
import {ClaimantDashboardComponent} from './claimant-dashboard/claimant-dashboard.component';
import {MyCaseComponent} from './my-case/my-case.component';
import {DefendantComponent} from './defendant/defendant.component';
import {ClaimantProfileComponent} from './claimant-profile/claimant-profile.component';
import {UpdateCaseComponent} from './update-case/update-case.component';
import {WitnessComponent} from './witness/witness.component';
import {CaseProgressComponent} from './case-progress/case-progress.component';
import {LawyerComponent} from './lawyer/lawyer.component';
import {MyDefendantComponent} from './my-defendant/my-defendant.component';
import {MyWitnessComponent} from './my-witness/my-witness.component';
import {NewUserComponent} from './new-user/new-user.component';
import {AdminResetPasswordComponent} from './admin-reset-password/admin-reset-password.component';
import {CloseFileComponent} from './close-file/close-file.component';
import {ClosedCasesComponent} from './closed-cases/closed-cases.component';


const routes: Routes = [
  {path: '', redirectTo: 'claimant-login', pathMatch: 'full'},
  {path: 'admin-login', component: AuthComponent},
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: ProfileComponent},
      {path: 'case-application', component: CaseApplicationComponent},
      {path: 'claimants', component: ClaimantsComponent},
      {path: 'cases', component: CasesComponent},
      {path: 'closed-cases', component: ClosedCasesComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'new-user', component: NewUserComponent},
      {path: 'reset-password', component: AdminResetPasswordComponent},
      {
        path: 'case/:id',
        component: UpdateCaseComponent,
        children: [
          {path: '', redirectTo: 'defendant', pathMatch: 'full'},
          {path: 'defendant', component: DefendantComponent},
          {path: 'witness', component: WitnessComponent},
          {path: 'lawyer', component: LawyerComponent},
          {path: 'case-progress', component: CaseProgressComponent},
          {path: 'close-file', component: CloseFileComponent},
          {path: '**', component: PageNotFoundComponent}
        ]
      },
      {path: '**', component: PageNotFoundComponent},
    ],
    canActivate: [AuthGuard]
  },
  {path: 'claimant-login', component: ClaimantLoginComponent},
  {
    path: 'claimant-dashboard',
    component: ClaimantDashboardComponent,
    children: [
      {path: '', redirectTo: 'my-case', pathMatch: 'full'},
      {path: 'my-case', component: MyCaseComponent},
      {path: 'my-defendant', component: MyDefendantComponent},
      {path: 'my-witness', component: MyWitnessComponent},
      {path: 'claimant-profile', component: ClaimantProfileComponent},
      {path: 'reset-password', component: SettingsComponent},
      {path: '**', component: PageNotFoundComponent},
    ],
    canActivate: [AuthGuard]
  },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [
  AuthComponent,
  AdminDashboardComponent,
  ClaimantsComponent,
  PageNotFoundComponent,
  CaseApplicationComponent,
  CasesComponent,
  ProfileComponent,
  SettingsComponent,
  ClaimantLoginComponent,
  ClaimantDashboardComponent,
  MyCaseComponent,
  DefendantComponent,
  ClaimantProfileComponent,
  UpdateCaseComponent,
  MyDefendantComponent,
  MyWitnessComponent,
  CaseProgressComponent,
  LawyerComponent,
  WitnessComponent,
  SettingsComponent,
  CloseFileComponent,
  ClosedCasesComponent
];
