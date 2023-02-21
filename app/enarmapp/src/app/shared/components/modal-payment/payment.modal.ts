import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: 'enarm-payment-modal',
    templateUrl: './payment.modal.html',
    styleUrls: ['./payment.modal.scss']
})
export class ModalPaymentComponent implements OnInit {

    @Output() dismiss = new EventEmitter();

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}