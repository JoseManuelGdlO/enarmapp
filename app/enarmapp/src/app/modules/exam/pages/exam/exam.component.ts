import { Component, OnInit } from "@angular/core";
import { ExamService } from "../../services/exam.service";
import { ActivatedRoute } from "@angular/router";
import * as lodash from 'lodash';

@Component({
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  answerSelection = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

  questionbar: Array<{ id: number, questions: number}> = [{ id: 1, questions: 4 }, { id: 2, questions: 3 }, { id: 3, questions: 3 }, { id: 4, questions: 4 }]
  fromApiQuesitons: any
  selectedQuestion = { clinic: 1, id: 1}
  questions: any
  isLoading = true
  answered = 0

  currentQuestion = 1;

  constructor(
    public examService: ExamService,
    public route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.getExam(params.id);
    });
  }

  async getExam(id: number): Promise<void> {
    try {
      const response = await this.examService.getExam(id)
      console.log('res', response.questionResponse);
      this.fromApiQuesitons = response.questionResponse
      const group = lodash.groupBy(response.questionResponse, 'idCasoclinico');
      console.log('group', group);

      this.questionbar = []
      for (const item of Object.values(group)) {
        this.questionbar.push({ id: item[0].idCasoclinico, questions: item.length })

        for(const subitem of item) {
          for(const answer of subitem.respuestas) {
            answer.selected = false
          }
        } 
        
      }
      this.questions = Object.values(group)
      console.log('questionbar', this.questionbar);
      this.selectedQuestion = { clinic: this.questionbar[0].id, id: 1 }
      this.isLoading = false
      
      
    } catch (error) {
      this.isLoading = false
      console.log('error', error);
    }
  }

  select(answer: any, answers: any) {
    for(const answer of answers) {
      answer.selected = false
    }
    answer.selected = true
  }

  onPauseTimer() {
    console.log('pause');
  }


}