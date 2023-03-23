import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IRadioButtonOptions } from "../../interfaces/radio-button.interface";

@Component({
    selector: 'enarm-radiobutton',
    templateUrl: './radiobuttons.component.html',
    styleUrls: ['./radiobuttons.component.scss']
})
export class RadioButtonComponent implements OnInit{  
    radioSelected: any;
    @Input() option: string = "idioma";
    @Input() options:IRadioButtonOptions[] = [
        { value: 'Joto', id: 1, selected: false },
        { value: 'Inglés', id: 1, selected: false },
    ]
    // optionsLanguage = [
    //     { value: 'Español', id: 1, selected: false },
    //     { value: 'Inglés', id: 1, selected: false },
    // ]
    // optionsMode = [
    //     { value: 'Modo estudio', id: 1, selected: false},
    //     { value: 'Modo simulador', id: 1, selected: false},
    // ]
    @Output() onSelectedRadio: EventEmitter<IRadioButtonOptions> = new EventEmitter();

    ngOnInit(){
        console.log(this.options, "-", this.option);
    }

    select(item:IRadioButtonOptions){
        this.options.forEach(x => x.selected=false);
        item.selected = true;
        console.log(item);
        this.onSelectedRadio.emit(item);
        
    }
}


