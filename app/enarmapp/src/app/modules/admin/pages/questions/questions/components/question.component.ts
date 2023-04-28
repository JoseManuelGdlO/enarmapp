import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'enarm-admin-question',
    templateUrl: './question.component.html'
})
export class QuestionComponent {

    @Output() remove = new EventEmitter()

    answers: Array<any> = [{}]
    showError: string = ''

    constructor() { }

    addAnswer() {
        this.answers.push({})
    }

    removeAnswer(index: number) {
        this.showError = ''
        if(this.answers.length > 1){
            this.answers.splice(index, 1)
        } else {
            this.showError = 'No puedes eliminar todas las respuestas'
        }
    }

}