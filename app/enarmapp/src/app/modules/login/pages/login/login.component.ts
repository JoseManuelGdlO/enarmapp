import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {

    constructor(
      public loginService: LoginService
    ){

    }

    async ngOnInit(): Promise<void> {
        const response =  await this.loginService.login('')
    }

    clickcomponent(){
      console.log("di click desde login");
    }
  }