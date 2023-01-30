import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'enarm-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

    @Input() placeholder = '';

    label = '';

    constructor(

    ) {

    }
    ngOnInit(): void {
    }
}