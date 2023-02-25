import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: 'enarm-modal',
    templateUrl: './enarm.modal.html',
    styleUrls: ['./enarm.modal.scss']
})
export class EnarmModalComponent implements OnInit {

    @Output() dismiss = new EventEmitter();

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}