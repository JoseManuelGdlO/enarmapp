import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";
import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {
    
    screenHeight = 0;

    constructor(
      public loginService: LoginService,
      private socialAuthService: SocialAuthService
    ){

    }

    async ngOnInit() {
      this.screenHeight = window.innerHeight;
      this.socialAuthService.authState.subscribe((user) => {
        console.log(user);
      });

      this.socialAuthService.authState.subscribe((user) => {
        console.log(user);
      });
    }

    loginFacebook(): void {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    loginGoogle(): void {
      this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    }

    clickcomponent(){
      console.log("di click desde login");
    }
  }