import { Component, OnInit, ErrorHandler, OnDestroy, Inject } from "@angular/core";

import { CounterService } from "./services/counter.component.service";
import { OpenIdConnectService } from "../shared/services/open-id-connect.service";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();
  title: string = "Sample Angular Client";
  claims: string[] = [];
  public currentCount = 0;
  private baseUrl: string;


  constructor(
    private openIdConnectService: OpenIdConnectService,
    private dataService: CounterService,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  public incrementCounter() {
    this.currentCount++;
  }

  callApi() {
    this.dataService
      .getClaims(this.baseUrl)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(claimsFromApi => {
        this.claims = this.claims.concat(claimsFromApi);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    Object.keys(this.openIdConnectService.user.profile).forEach(property => {
      this.claims.push(
        `${property} : ${this.openIdConnectService.user.profile[property]}`
      );
    });
  }
}

