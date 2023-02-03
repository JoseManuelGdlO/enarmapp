import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
  })
  export class SignUpComponent implements OnInit {

    screenHeight = 0;

    constructor(){}

    async ngOnInit() {
      this.screenHeight = window.innerHeight;
    }
  }