import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule, routingComponent} from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {NgxPrintModule} from 'ngx-print';
import { NewUserComponent } from './new-user/new-user.component';
import { AdminResetPasswordComponent } from './admin-reset-password/admin-reset-password.component';
import { ClosedCasesComponent } from './closed-cases/closed-cases.component';



@NgModule({
  declarations: [
    AppComponent,
   routingComponent,
   NewUserComponent,
   AdminResetPasswordComponent,
   ClosedCasesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    NgxPrintModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
