import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

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
    ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

    @Input() placeholder = '';
    @Input() type = 'normal';
    @Input() name = 'input-example';
    @Output() keyPress = new EventEmitter<string>()
    @Output() onBlur = new EventEmitter<string>()
    @Input() format = 'text'
    //current form control input. helpful in validating and accessing form control
    @Input() control: FormControl = new FormControl();

    // set true if we need not show the asterisk in red color
    @Input() optional: boolean = false;

    @Input() ngModel = '';

    // Output prop name must be Input prop name + 'Change'
    errors: Array<any> = [];

    // Use in your component to write an updated value back out to the parent
    @Output() ngModelChange = new EventEmitter<string>();

    // get reference to the input element
    @ViewChild('box') inputRef!: ElementRef;
    //The internal data model for form control value access
    private innerValue: any = '';

    label = '';

    disabled = false

    constructor(

    ) {

    }

    writeValue(value: string): void {
        this.ngModel = value;
        this.innerValue = value;
    }
    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any): void {
        return
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled
    }

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }

    //propagate changes into the custom form control
    propagateChange = (_: any) => { }

    ngOnInit(): void {
        
        // RESET the custom input form control UI when the form control is RESET
        this.control.valueChanges.subscribe(
            () => {
                // check condition if the form control is RESET
                if (this.control.value == "" || this.control.value == null || this.control.value == undefined) {
                    this.innerValue = "";
                    this.inputRef.nativeElement.value = "";
                }
            }
        );
    }

    // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
    onChange(e: Event, value: any) {
        //set changed value
        this.innerValue = value;
        // propagate value into form control using control value accessor interface
        this.propagateChange(this.innerValue);

        //reset errors 
        this.errors = [];
        //setting, resetting error messages into an array (to loop) and adding the validation messages to show below the field area
        for (var key in this.control.errors) {
            if (this.control.errors.hasOwnProperty(key)) {
                if (key === "required") {
                    this.errors.push("el campo es requerido");
                } else if (key === "email") {
                    this.errors.push('Correo incorrecto');
                } else {
                    this.errors.push(this.control.errors[key]);
                }
            }
        }
    }

    onKey(event: KeyboardEvent) {
        this.keyPress.emit((event.target as HTMLInputElement).value);
        this.ngModelChange.emit((event.target as HTMLInputElement).value)
    }

    update(value: string) {
        this.onBlur.emit(value);
    }
}