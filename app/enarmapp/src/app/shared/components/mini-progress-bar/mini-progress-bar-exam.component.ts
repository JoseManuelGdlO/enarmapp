import { Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'enarm-mini-progress-bar-exam',
    templateUrl: './mini-progress-bar-exam.component.html',
    styleUrls: ['./mini-progress-bar-exam.component.scss']
})
export class MiniProgressBarExamComponent implements OnInit {
    
    @Input() percentage = '79';
    @Input() subtitle = '123/162';

    constructor(
        
    ){

    }

    async ngOnInit(): Promise<void> {
        
    }

}