import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'enarm-questions-bar',
    templateUrl: './questions-bar.component.html',
    styleUrls: ['./questions-bar.component.scss']
})
export class QuestionsBarComponent implements OnInit {

    questions: Array<{ id: number, questions: number, total?: Array<{ id: number, selected: boolean, question: number }> }> = [{ id: 1, questions: 4 }, { id: 2, questions: 3 }, { id: 3, questions: 3 }, { id: 4, questions: 4 }]

    @Input('questions') set value(value: Array<{ id: number, questions: number, total?: Array<{ id: number, selected: boolean, question: number }> }>) {
        this.questions = value;
        this.startQuestions()
    }

    selected = { clinic: 2, id: 2, index: 2 }

    @Input() set select(value: { clinic: number, id: number, index: number } ) {    
        this.selected = value
        this.startQuestions()
    }

    constructor()
    {
    }

    ngOnInit(): void {
        this.startQuestions()
    }

    startQuestions(){
        for(let item of this.questions) {            
            item.total = new Array()
            for(let subitem = 0; subitem < item.questions; subitem++) {
                let selected = false;
                if(item.id === this.selected.clinic && subitem+1 === this.selected.id) {
                    selected = true;
                }
                item.total.push({ selected, question: subitem + 1, id: subitem + 1 })
            }
        }
        

    }
}