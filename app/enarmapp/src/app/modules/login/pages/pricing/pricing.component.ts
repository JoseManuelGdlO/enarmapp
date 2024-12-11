import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.scss'],
  })
  export class PricingComponent implements OnInit {

    yearlyBilling: boolean = true;

    constructor(
    ){}

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

  }