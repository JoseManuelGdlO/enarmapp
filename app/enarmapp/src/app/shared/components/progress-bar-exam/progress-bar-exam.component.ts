import { Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'enarm-progress-bar-exam',
    templateUrl: './progress-bar-exam.component.html',
    styleUrls: ['./progress-bar-exam.component.scss']
})
export class ProgressBarExamComponent implements OnInit {
    
    @Input() percentage = '34';

    constructor(
        
    ){

    }

    async ngOnInit(): Promise<void> {
            this.percentage = Math.round(Number(this.percentage)).toString();
    }

}