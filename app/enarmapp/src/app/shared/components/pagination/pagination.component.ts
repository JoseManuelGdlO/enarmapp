import { Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'enarm-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Input() currentQuestion = 1;
    @Input() totalQuestions = 1;
    

    constructor(
        
    ){

    }

    async ngOnInit(): Promise<void> {
        
    }

}