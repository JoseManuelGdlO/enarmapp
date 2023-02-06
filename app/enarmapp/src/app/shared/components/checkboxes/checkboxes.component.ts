import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'enarm-checkboxes',
    templateUrl: './checkboxes.component.html',
    styleUrls: ['./checkboxes.component.scss']
})
export class CheckBoxesComponent {  
    options = [
        { value: 'No contestadas', id: 1, selected: false },
        { value: 'Correctas', id: 1, selected: false },
        { value: 'Incorrectas', id: 1, selected: false },
    ]

    select(item:any){

    }
}

