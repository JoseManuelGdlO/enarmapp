import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { PreferencesService } from "app/shared/services/preferences.service";
import { Router } from "@angular/router";
import { loadStripe, Stripe, StripeElements, StripeElement, StripeCardElement, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { STRIPE_KEY } from "environments/environment";
import { VauchersService } from "app/shared/services/vauchers.service";
import { MatDialog } from "@angular/material/dialog";
import { PaymentFormulario } from "./payment/payment.component";
import { FuseConfirmationService } from "@fuse/services/confirmation";

@Component({
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {

  yearlyBilling: boolean = true;

  subscritpions!: any

  coupon = '';
  errorCoupon = '';
  couponObj!: any

  successCoupon = '';

  selectedSubscription!: any

  constructor(
    private router: Router,
    private loginService: LoginService,
    private vauchersService: VauchersService,
    public dialog: MatDialog,
    public _fuseConfirmationService: FuseConfirmationService
  ) { }

  ngOnInit(): void {
    this.getCatalog();
  }

  async applyCoupon() {
    this.errorCoupon = '';
    const code = this.coupon; // Cambia esta línea con el código del cupón

    if (!code) {
      this.errorCoupon = 'Debes ingresar un código de cupón';
      setTimeout(() => {
        this.errorCoupon = '';
      }, 5000);
      return;
    }

    try {
      const response = await this.vauchersService.getPeerCode(code);
      console.log('Cupón aplicado:', response);
      if (response) {
        const expiration = new Date(response.expiration_date);
        const today = new Date();
        if (expiration < today) {
          this.errorCoupon = 'Cupón expirado';
          setTimeout(() => {
            this.errorCoupon = '';
          }, 5000);
          return
        }

        const usageCount = response.usage_count;
        const usageLimit = response.usage_limit;
        if (usageCount >= usageLimit) {
          this.errorCoupon = 'Cupón agotado';
          setTimeout(() => {
            this.errorCoupon = '';
          }, 5000);
          return
        }

        this.successCoupon = 'Cupón ' + response.name + ' con éxito';
        setTimeout(() => {
          this.successCoupon = '';
        }, 5000);
        this.couponObj = response;

      }
    } catch (error) {
      this.errorCoupon = 'Cupón inválido o expirado';
      setTimeout(() => {
        this.errorCoupon = '';
      }, 5000);
    }
  }

  selectAmount(subscription: any) {
    this.selectedSubscription = subscription;
    this.pay()
  }

  pay() {
    const elemento = this.selectedSubscription;
    const data = {
      item: Object.assign({}, elemento),
      coupon: this.couponObj,
    }
    const formularioModal = this.dialog.open(PaymentFormulario, {
      width: '800px',
      data: data,
    });
    formularioModal.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        // Open the confirmation and save the reference
        const dialogRef = this._fuseConfirmationService.open({
          "title": "Pago Completado!",
          "message": "Ya eres parte de nuestra plataforma <span class=\"font-medium\">disfruta tus beneficios!</span>",
          "icon": {
            "show": true,
            "name": "heroicons_outline:check-badge",
            "color": "success"
          },
          "actions": {
            "confirm": {
              "show": true,
              "label": "Cerrar",
              "color": "primary"
            },
            "cancel": {
              "show": false,
              "label": "Cance"
            }
          },
          "dismissible": true
        });

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
        });
        this.router.navigate(['/home']);
      }
    });
  }

  showPrice(price: any) {
    if (this.couponObj) {
      if (this.couponObj.type === 'percentage') {
        return price - (price * this.couponObj.discount / 100);
      } else {
        return price - this.couponObj.discount;
      }
    }

    return price;

  }

  async getCatalog() {
    this.subscritpions = await this.loginService.getSubscriptions();
  }

  async otherMoment() {
    await this.loginService.changeUserStatus(3)
    this.router.navigate(['/home']);
  }

}