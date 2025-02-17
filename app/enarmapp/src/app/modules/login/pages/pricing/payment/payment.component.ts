import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FuseAlertComponent } from "@fuse/components/alert";
import { PreferencesService } from '../../../../../shared/services/preferences.service';
import { Stripe, StripeElements, StripeCardNumberElement, StripeCardExpiryElement, StripeCardCvcElement, loadStripe } from "@stripe/stripe-js";
import { STRIPE_KEY } from "environments/environment";
import { LoginService } from "app/modules/login/services/login.service";
import { SharedModule } from "app/shared/shared.module";

@Component({
    standalone: true,
    selector: 'app-payment-formulario',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    imports: [
        CommonModule,
        FuseAlertComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        TextFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class PaymentFormulario {
    item!: any;
    user!: any;
    couponObj!: any;

    @ViewChild('cardElement') cardNumberElement!: ElementRef;
    @ViewChild('expiryElement') expiryElement!: ElementRef;
    @ViewChild('cvcElement') cvcElement!: ElementRef;

    stripe!: Stripe | null;
    elements!: StripeElements;
    cardNumber!: StripeCardNumberElement;
    expiry!: StripeCardExpiryElement;
    cvc!: StripeCardCvcElement;

    isLoading = false;


    constructor(
        public dialogRef: MatDialogRef<PaymentFormulario>,
        @Inject(MAT_DIALOG_DATA) public data: { item: any, coupon: any },
        public preferencesService: PreferencesService,
        public loginService: LoginService,
    ) {
        this.item = data.item;
        
        this.couponObj = data.coupon;
        console.log(this.item, this.couponObj);
        this.user = this.preferencesService.getItem('USER');
    }

    async ngAfterViewInit() {
        if (this.cardNumberElement && this.expiryElement && this.cvcElement) {
            this.stripe = await loadStripe(STRIPE_KEY); // Reemplaza con tu clave

            if (this.stripe) {
                this.elements = this.stripe.elements();

                // Crear los elementos separados
                this.cardNumber = this.elements.create('cardNumber');
                this.expiry = this.elements.create('cardExpiry');
                this.cvc = this.elements.create('cardCvc');

                // Montar los elementos en sus respectivos contenedores
                this.cardNumber.mount(this.cardNumberElement.nativeElement);
                this.expiry.mount(this.expiryElement.nativeElement);
                this.cvc.mount(this.cvcElement.nativeElement);
            }
        } else {
            console.error('Error: Los elementos no están disponibles en la vista.');
        }
    }


    async handlePayment() {
        if(this.isLoading) return;

        if (!this.stripe) {
            console.error('Stripe no está inicializado.');
            return;
        } // Cambia esta línea con el monto que deseas cobrar
        this.isLoading = true;
        try {
            // Crear el token usando los tres elementos de tarjeta
            const { token, error } = await this.stripe.createToken(this.cardNumber); // Usamos cardNumber y no 'expiration_month'
           

            if (error) {
                console.error('Error en el pago:', error.message);
            } else {
                console.log('Token generado:', token);    // Aquí debes enviar el token y el monto al backend para procesar el pago
                this.processPayment(token.id);
            }

        } catch (error) {
            console.error('Error al procesar el pago:', error);
            this.isLoading = false;
        } 
    }

    async processPayment(token: string) {
        // Envía el token y el monto al backend para procesar el pago
        try {
            const response = await this.loginService.processPayment(token, this.item, this.couponObj);
            if (response.code === 200) {
                this.dialogRef.close(response);
            } else {
                console.error('Error al procesar el pago:', response.error);
            }
        } catch (error) {
            console.error('Error de conexión o procesamiento del pago:', error);
        } finally {
            this.isLoading = false;
        }
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

    cancel() {
        this.dialogRef.close();
    }
}