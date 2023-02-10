import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'enarm-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true,
      },
    ],
})
export class InputComponent implements OnInit, ControlValueAccessor  {

    @Input() placeholder = '';
    @Input() type = 'normal';
    @Input() name = 'input-example';
    @Output() keyPress = new EventEmitter<string>()
    @Output() onBlur = new EventEmitter<string>()
    @Input() format = 'text'

    @Input() ngModel = '';

    // Output prop name must be Input prop name + 'Change'
    // Use in your component to write an updated value back out to the parent
    @Output() ngModelChange = new EventEmitter<string>();

    label = '';

    constructor(

    ) {

    }

    writeValue(value: string): void {
        this.ngModel = value;
    }
    registerOnChange(fn: any): void {
       return
    }
    registerOnTouched(fn: any): void {
        return 
    }
    setDisabledState?(isDisabled: boolean): void {
        return
    }

    ngOnInit(): void {
    }

    onKey(event: KeyboardEvent) { 
        this.keyPress.emit((event.target as HTMLInputElement).value);
        this.ngModelChange.emit((event.target as HTMLInputElement).value)
    }

    update(value: string) {
        this.onBlur.emit(value);
    }
}