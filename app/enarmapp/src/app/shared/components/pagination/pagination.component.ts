import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: 'enarm-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

    @Input() currentQuestion = 1;
    @Input() totalQuestions = 1;

    @Output() nextQuestion = new EventEmitter();
    

    constructor(
        
    ){

    }

}