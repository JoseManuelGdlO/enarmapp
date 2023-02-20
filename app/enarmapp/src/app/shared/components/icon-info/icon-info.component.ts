import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'enarm-icon-info',
    templateUrl: './icon-info.component.html',
    styleUrls: ['./icon-info.component.scss']
})
export class IconInfoComponent implements OnInit {
    
    @Input() message = '';
    isOpen:boolean = false;
    constructor(
        
    ){

    }

    async ngOnInit(): Promise<void> {
        
    }
}