import { Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'enarm-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
    
    @Input() text = '';
    @Input() percentage = '';

    constructor(
        
    ){

    }

    async ngOnInit(): Promise<void> {
        
    }

}