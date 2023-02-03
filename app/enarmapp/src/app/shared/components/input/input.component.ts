import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'enarm-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

    @Input() placeholder = '';
    @Input() type = 'normal';
    @Output() keyPress = new EventEmitter<string>()
    @Output() onBlur = new EventEmitter<string>()

    label = '';

    constructor(

    ) {

    }
    ngOnInit(): void {
    }

    onKey(event: KeyboardEvent) { 
        this.keyPress.emit((event.target as HTMLInputElement).value );
    }

    update(value: string) {
        this.onBlur.emit(value);
    }
}