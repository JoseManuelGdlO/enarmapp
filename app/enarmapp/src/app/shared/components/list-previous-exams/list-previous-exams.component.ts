import { Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'enarm-list-previous-exams',
    templateUrl: './list-previous-exams.component.html',
    styleUrls: ['./list-previous-exams.component.scss']
})
export class ListPreviousExamsComponent implements OnInit {
    
    @Input() exam = '';
    @Input() date = '';
    @Input() percentage = '';
    @Input() completed = '';
    @Input() status = Boolean;

    constructor(
        
    ){

    }

    async ngOnInit(): Promise<void> {
        
    }

}