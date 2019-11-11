import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { SigninOidcComponent } from './signin-oidc/signin-oidc.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppRoutingModule } from './app.routing';

import { RequireAuthenticatedUserRouteGuardService } from './shared/services/require-authenticated-user-route-guard.service';
import { AddAuthorizationHeaderInterceptor } from './shared/interceptors/add-authorization-header-interceptor';

import { GlobalErrorHandler } from './shared/handlers/global-error-handler';
import { ErrorLoggerService } from './shared/services/error-logger.service';
import { OpenIdConnectService } from './shared/services/open-id-connect.service';
import { CounterService } from './counter/services/counter.component.service';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SigninOidcComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AddAuthorizationHeaderInterceptor,
    multi: true
  }, GlobalErrorHandler, ErrorLoggerService,
   OpenIdConnectService, CounterService, 
   RequireAuthenticatedUserRouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
