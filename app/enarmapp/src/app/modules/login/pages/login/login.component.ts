import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PreferencesService } from "src/app/shared/services/preferences.service";
import { LoginService } from "../../services/login.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  screenHeight = 0;
  email = '';
  password = '';
  rememberme = false;
  error = false;

  isLoading = false;

  constructor(
    public loginService: LoginService,
    private socialAuthService: SocialAuthService,
    private preferencesServices: PreferencesService,
    public router: Router
  ) {

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

  async login() {

    this.error = false;
    if (!this.validate()) {
      this.error = true
      return
    }
    this.isLoading = true;
    try {
      const response: any = await this.loginService.login(this.email, this.password)
      if (response) {
        if (this.rememberme) {

          this.preferencesServices.setItem('AUTH_TOKEN', response.token)
          this.preferencesServices.setItem('USER', response.data[0]);
        }
        this.router.navigateByUrl('home')
      }

      this.isLoading = false;
    } catch (error) {
      this.error = true
      this.isLoading = false;
    }

  }

  validate(): boolean {
    const expressionEmail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const expressionPass: RegExp = /^\s*$/i;
    let error = true

    error = !expressionEmail.test(this.email);

    error = !expressionPass.test(this.password);

    return error;

  }

  clickcomponent() {
    console.log("di click desde login");
  }
}