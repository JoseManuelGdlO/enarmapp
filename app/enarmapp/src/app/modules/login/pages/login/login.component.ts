import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PreferencesService } from "app/shared/services/preferences.service";
import { LoginService } from "../../services/login.service";
import { ApexOptions } from "ng-apexcharts";
/* eslint-disable */
import { DateTime } from 'luxon';

/* Get the current instant */
const now = DateTime.now();

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

  chartConversions!: ApexOptions;

  isLoading = false;

  constructor(
    public loginService: LoginService,
    private socialAuthService: SocialAuthService,
    private preferencesServices: PreferencesService,
    public router: Router
  ) {

  }

  

  async ngOnInit() {
    this.isLoading = true;// Attach SVG fill fixer to all ApexCharts
    
    if (await this.preferencesServices.getItem('RMBR')) {
      this.router.navigateByUrl('home')
    }
    this.isLoading = false;
    this.screenHeight = window.innerHeight;
    this.socialAuthService.authState.subscribe((user) => {
      if (user?.email) {
        this.socialMediaLogin(user)
      } else {

        this.isLoading = false;
      }
    });
    
    this.chartConversions = {
      chart  : {
          animations: {
              enabled: false,
          },
          fontFamily: 'inherit',
          foreColor : 'inherit',
          height    : '100%',
          type      : 'area',
          sparkline : {
              enabled: true,
          },
      },
      colors : ['#38BDF8'],
      fill   : {
          colors : ['#38BDF8'],
          opacity: 0.5,
      },
      series : [
        {
            name: 'Conversions',
            data: [4412, 4345, 4541, 4677, 4322, 4123],
        },
    ],
      stroke : {
          curve: 'smooth',
      },
      tooltip: {
          followCursor: true,
          theme       : 'dark',
      },
      xaxis  : {
          type      : 'category',
          categories: [
            now.minus({days: 47}).toFormat('dd MMM') + ' - ' + now.minus({days: 40}).toFormat('dd MMM'),
            now.minus({days: 39}).toFormat('dd MMM') + ' - ' + now.minus({days: 32}).toFormat('dd MMM'),
            now.minus({days: 31}).toFormat('dd MMM') + ' - ' + now.minus({days: 24}).toFormat('dd MMM'),
            now.minus({days: 23}).toFormat('dd MMM') + ' - ' + now.minus({days: 16}).toFormat('dd MMM'),
            now.minus({days: 15}).toFormat('dd MMM') + ' - ' + now.minus({days: 8}).toFormat('dd MMM'),
            now.minus({days: 7}).toFormat('dd MMM') + ' - ' + now.toFormat('dd MMM'),
        ],
      },
      yaxis  : {
          labels: {
              formatter: (val): string => val.toString(),
          },
      },
  };
  }

  loginFacebook(): void {
    this.isLoading = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginGoogle(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  async socialMediaLogin(user: any) {
    try {
      const response = await this.loginService.loginForId(user.email, user.id);
      this.preferencesServices.setItem('RMBR', true)
      this.preferencesServices.setItem('AUTH_TOKEN', response.token)
      this.preferencesServices.setItem('USER', response.data);
      if (response.data.data.idTipoUsuario === 5) {
        this.router.navigateByUrl('admin')
      } else {
        this.router.navigateByUrl('home')
      }
      this.isLoading = false;

    } catch (error: any) {
      this.isLoading = false;
      if (error.status === 404) {
        this.preferencesServices.setItem('USER_MEDIA', user)
        this.router.navigateByUrl('login/sign-up')
      }

    }
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
        this.preferencesServices.setItem('RMBR', this.rememberme)
        this.preferencesServices.setItem('AUTH_TOKEN', response.token)
        this.preferencesServices.setItem('USER', response.data);
        if (response.data.data.idTipoUsuario === 5) {
          this.router.navigateByUrl('admin')
        } else {
          this.router.navigateByUrl('home')
        }
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