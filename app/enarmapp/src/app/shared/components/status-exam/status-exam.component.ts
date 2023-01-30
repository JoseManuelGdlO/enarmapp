import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'enarm-status-exam',
    templateUrl: './status-exam.component.html',
    styleUrls: ['./status-exam.component.scss']
})
export class StatusExamComponent implements OnInit {

    @Input() type = 1;

    label = '';

    constructor(

    ) {

    }
    ngOnInit(): void {
        switch (this.type) {
            case 1:
                this.label = 'Terminado';
                break
            case 2:
                this.label = 'En progreso';
                break
            case 3:
                this.label = 'Reprobado';
                break
        }
    }
}