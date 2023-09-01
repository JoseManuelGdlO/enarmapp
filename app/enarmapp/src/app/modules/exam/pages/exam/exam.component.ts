import { Component, OnInit } from "@angular/core";
import { ExamService } from "../../services/exam.service";
import { ActivatedRoute } from "@angular/router";
import * as lodash from 'lodash';
import { AdminService } from "src/app/modules/admin/services/admin.service";
import { ILaboratory } from "src/app/shared/interfaces/laboratory.interface";

@Component({
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  answerSelection = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  examId = 0

  questionbar: Array<{ id: number, questions: number}> = [{ id: 1, questions: 4 }, { id: 2, questions: 3 }, { id: 3, questions: 3 }, { id: 4, questions: 4 }]
  fromApiQuesitons: any
  selectedQuestion = { clinic: 2, id: 1, index: 0}
  questions: any
  isLoading = true
  answered = 0
  corrects = 0
  isAnswered = false;
  isFinish = false

  showLaboratories = false

  Laboratories!: ILaboratory[]

  currentQuestion = 1;

  constructor(
    public examService: ExamService,
    public adminService: AdminService,
    public route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.examId = params.id;
      this.getExam(params.id);
    });

    this.getLaboratory()
  }

  async getLaboratory() {
    try {
      this.Laboratories = await this.adminService.getLaboratories()
      console.log('response', this.Laboratories);
      
    } catch (error) {
      console.log('error', error);
    }
  }

  async getExam(id: number): Promise<void> {
    try {
      const response = await this.examService.getExam(id)
      console.log('res', response.questionResponse);
      this.fromApiQuesitons = response.questionResponse
      const group = lodash.groupBy(response.questionResponse, 'idCasoclinico');

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
      console.log('questions', this.questions);
      console.log('questionbar', this.questionbar);
      this.selectedQuestion = { clinic: this.questionbar[0].id, id: 1, index: 0 }
      this.isLoading = false
      
      
    } catch (error) {
      this.isLoading = false
      console.log('error', error);
    }
  }

  async select(answer: any, answers: any) {
    for(const answer of answers) {
      answer.selected = false
    }
    answer.selected = true

    try {
      await this.examService.selectAnswer({ idExamen: this.examId, idPregunta: this.questions[this.selectedQuestion.index][this.selectedQuestion.id - 1].id, idRespuesta:answer.id})
      this.isAnswered = true
      this.answered++
      if(answer.isCorrecta) {
        this.corrects++
      }
      this.newxtQuestion()
    } catch(error) {
      console.log('error', error);
    }

    
  }

  onPauseTimer() {
    console.log('pause');
  }

  newxtQuestion() {
    this.currentQuestion++
    const question  = this.questionbar[this.selectedQuestion.index]
    let index = this.questionbar.findIndex(item => item.id === this.selectedQuestion.clinic)
    let id = this.selectedQuestion.id
    let clinic = this.selectedQuestion.clinic
    if(id < question.questions) {
      id = id + 1
    }else if(index +1 < this.questionbar.length) {
      clinic = this.questionbar[index + 1].id
      index++
      id = 1
    } else {
      this.isFinish = true;
      
    }

    this.selectedQuestion = {clinic, id, index }
    
    this.isAnswered = false
  }

  continue() {
    console.log('continue');
    
  }

  openLaboratories() {
    this.showLaboratories = !this.showLaboratories
    
  }


}