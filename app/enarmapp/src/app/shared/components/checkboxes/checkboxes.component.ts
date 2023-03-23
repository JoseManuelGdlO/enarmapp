import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ICheckBoxOptions } from "../../interfaces/checkbox-options.interface";

@Component({
    selector: 'enarm-checkbox',
    templateUrl: './checkboxes.component.html',
    styleUrls: ['./checkboxes.component.scss']
})
export class CheckBoxesComponent {  
    @Input() options:ICheckBoxOptions[] = [
        { value: 'No contestadas', id: 1, selected: false },
        { value: 'Correctas', id: 1, selected: false },
        { value: 'Incorrectas', id: 1, selected: false },
    ]

    @Output() onSelectedOption: EventEmitter<ICheckBoxOptions> = new EventEmitter();

    select(item:ICheckBoxOptions){
        if(item.selected == true){
            item.selected = false;
        }else{
            item.selected = true;
        }
        console.log(item.value + " - " + item.selected);
        this.onSelectedOption.emit(item);
    }
}

