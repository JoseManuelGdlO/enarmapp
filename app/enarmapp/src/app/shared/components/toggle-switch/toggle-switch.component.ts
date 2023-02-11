import { Component } from "@angular/core";

@Component({
    selector: 'enarm-toggle-switch',
    templateUrl: './toggle-switch.component.html',
    styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent {  
    isSelected = false;

    select(){
        console.log(this.isSelected);
    }
}

