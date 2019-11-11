import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { NgModule } from '@angular/core';
import { SigninOidcComponent } from './signin-oidc/signin-oidc.component';
import { RequireAuthenticatedUserRouteGuardService } from './shared/services/require-authenticated-user-route-guard.service';
//import { RedirectSilentRenewComponent } from './redirect-silent-renew/redirect-silent-renew.component';

const routes: Routes = [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent, canActivate: [RequireAuthenticatedUserRouteGuardService] },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'signin-oidc', component: SigninOidcComponent}
];

// define a module
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
