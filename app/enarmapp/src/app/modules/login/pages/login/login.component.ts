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
  isMobile!: boolean;

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
    this.isMobile = this.detectMobileDevice();

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
    }, (error) => {
      this.isLoading = false;
    }
    );

    this.chartConversions = {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'area',
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#38BDF8'],
      fill: {
        colors: ['#38BDF8'],
        opacity: 0.5,
      },
      series: [
        {
          name: 'Conversions',
          data: [4412, 4345, 4541, 4677, 4322, 4123],
        },
      ],
      stroke: {
        curve: 'smooth',
      },
      tooltip: {
        followCursor: true,
        theme: 'dark',
      },
      xaxis: {
        type: 'category',
        categories: [
          now.minus({ days: 47 }).toFormat('dd MMM') + ' - ' + now.minus({ days: 40 }).toFormat('dd MMM'),
          now.minus({ days: 39 }).toFormat('dd MMM') + ' - ' + now.minus({ days: 32 }).toFormat('dd MMM'),
          now.minus({ days: 31 }).toFormat('dd MMM') + ' - ' + now.minus({ days: 24 }).toFormat('dd MMM'),
          now.minus({ days: 23 }).toFormat('dd MMM') + ' - ' + now.minus({ days: 16 }).toFormat('dd MMM'),
          now.minus({ days: 15 }).toFormat('dd MMM') + ' - ' + now.minus({ days: 8 }).toFormat('dd MMM'),
          now.minus({ days: 7 }).toFormat('dd MMM') + ' - ' + now.toFormat('dd MMM'),
        ],
      },
      yaxis: {
        labels: {
          formatter: (val): string => val.toString(),
        },
      },
    };
  }

  detectMobileDevice(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    console.log('User Agent', userAgent);
    
    // Verifica los dispositivos más comunes
    if (/iphone|ipod|android|blackberry|windows phone|webos|mobile|tablet/i.test(userAgent)) {
      return true;
    }
    
    // También puedes verificar el tamaño de la ventana, si es menor que un tamaño típico de escritorio
    if (window.innerWidth <= 800) {
      return true;
    }

    return false;
  }

  loginFacebook(): void {
    this.isLoading = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).catch((error) => {
      this.isLoading = false;
      console.log('Error al iniciar sesión con Facebook', error);
    });
      
  }

 signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  async socialMediaLogin(user: any) {
    try {
      const response = await this.loginService.loginForId(user.email, user.id);
      this.preferencesServices.setItem('RMBR', true)
      this.preferencesServices.setItem('AUTH_TOKEN', response.token)
      this.preferencesServices.setItem('USER', response);

      if(response.account.name === 0) {
        this.router.navigateByUrl('login/pricing')
        this.isLoading = false;
        return
      }

      if (response.user.user_type_id === 5) {
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

  declare google: any; // Declarar Google si usas TypeScript

handleCredentialResponse(response: any) {
  // Token JWT devuelto por Google
  const credential = response.credential;

  // Decodificar el JWT para extraer información del usuario
  const userInfo = this.parseJwt(credential);

  console.log('Información del usuario:', userInfo);

  // Puedes redirigir o guardar el correo según lo requieras
  const email = userInfo.email;
  console.log('Correo del usuario:', email);

  // Aquí puedes redirigir al usuario o realizar una llamada a tu backend
  window.location.href = `/dashboard?email=${email}`;
}

// Función para decodificar el JWT (Token)
parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
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
        this.preferencesServices.setItem('USER', response);

        if(response.account.name === 0) {
          this.router.navigateByUrl('login/pricing')
          this.isLoading = false;
          return
        }
        if (response.user.user_type_id === 5) {
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