import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { PreferencesService } from "app/shared/services/preferences.service";
import { Router } from "@angular/router";
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Component({
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.scss'],
  })
  export class PricingComponent implements OnInit {

    @ViewChild('cardElement') cardElement!: ElementRef;
    yearlyBilling: boolean = true;

    stripe!: Stripe | null;
    elements!: StripeElements;
    card!: StripeCardElement;

    subscritpions!: any

    constructor(
      private router: Router,
      private loginService: LoginService
    ){}

    async ngAfterViewInit() {
      this.stripe = await loadStripe('TU_CLAVE_PUBLICA_STRIPE'); // Reemplaza con tu clave
  
      if (this.stripe) {
        this.elements = this.stripe.elements();
        this.card = this.elements.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#32325d',
            },
          },
        });
  
        this.card.mount(this.cardElement.nativeElement);
      }
    }

    ngOnInit(): void {
     this.getCatalog();
    }

    async handlePayment() {
      if (!this.stripe) {
        console.error('Stripe no está inicializado.');
        return;
      }
      const { token, error } = await this.stripe.createToken(this.card);
      if (error) {
        console.error('Error en el pago:', error.message);
      } else {
        console.log('Token generado:', token);
        // Aquí puedes enviar el token a tu backend para procesar el pago
      }
    }

    async getCatalog(){
      this.subscritpions = await this.loginService.getSubscriptions();
    }

    otherMoment(){
      this.router.navigate(['/home']);
    }

  }