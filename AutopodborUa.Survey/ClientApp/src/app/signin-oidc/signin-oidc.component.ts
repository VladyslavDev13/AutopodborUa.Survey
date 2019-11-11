import { Component, OnInit, OnDestroy } from "@angular/core";
import { OpenIdConnectService } from "../shared/services/open-id-connect.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-signin-oidc",
  templateUrl: "./signin-oidc.component.html"
})
export class SigninOidcComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();
  constructor(
    private openIdConnectService: OpenIdConnectService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.openIdConnectService.userLoaded$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(userLoaded => {
        if (userLoaded) {
          this.router.navigate(["./"]);
        }
      });

    this.openIdConnectService.handleCallback();
  }
}
