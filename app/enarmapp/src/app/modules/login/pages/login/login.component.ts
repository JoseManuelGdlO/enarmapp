import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {
    
    screenHeight = 0;

    constructor(
      public loginService: LoginService
    ){

    }

    async ngOnInit() {
      this.screenHeight = window.innerHeight;
    }

    clickcomponent(){
      console.log("di click desde login");
    }
  }