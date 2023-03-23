import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'enarm-toggle-switch',
    templateUrl: './toggle-switch.component.html',
    styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent {  
    isSelected = false;
    @Output() onChangedValue: EventEmitter<boolean> = new EventEmitter();

    select(){
        if(this.isSelected == false){
            this.onChangedValue.emit(true);
        }else if(this.isSelected == true){
            this.onChangedValue.emit(false);
        }
    }
}

