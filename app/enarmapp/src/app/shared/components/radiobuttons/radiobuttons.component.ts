import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'enarm-radiobutton',
    templateUrl: './radiobuttons.component.html',
    styleUrls: ['./radiobuttons.component.scss']
})
export class RadioButtonComponent {  
    radioSelected: any;
    @Input() option = "idioma";

    optionsLanguage = [
        { value: 'Español', id: 1, selected: false },
        { value: 'Inglés', id: 1, selected: false },
    ]

    optionsMode = [
        { value: 'Modo estudio', id: 1, selected: false},
        { value: 'Modo simulador', id: 1, selected: false},
    ]

    select(item:any){
        console.log(item.value);
    }
}

