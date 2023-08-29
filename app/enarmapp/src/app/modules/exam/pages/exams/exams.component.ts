import { Component, OnInit } from "@angular/core";
import { HomeService } from "src/app/modules/home/services/home.service";
import { IUser } from "src/app/shared/interfaces/user.interface";
import { PreferencesService } from "src/app/shared/services/preferences.service";

@Component({
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {

  exams = [
    { id: 1, progress: 79, questions: 162, answers: 123, status: 1, creationDate: '', respondidas: 1, numeroPreguntas: 1, isEspanol: 1 },
    { id: 2, progress: 65, questions: 162, answers: 100, status: 2, creationDate: '', respondidas: 1, numeroPreguntas: 1, isEspanol: 1 },
    { id: 3, progress: 38, questions: 162, answers: 67, status: 2, creationDate: '', respondidas: 1, numeroPreguntas: 1, isEspanol: 1 },
    { id: 4, progress: 15, questions: 162, answers: 32, status: 3, creationDate: '', respondidas: 1, numeroPreguntas: 1, isEspanol: 1 },
  ]
  user!: IUser
  responsedata!: any;

  constructor(
    public homeService: HomeService,
    public preferencesService: PreferencesService
  ) {

  }

  ngOnInit(): void {
    this.responsedata = this.preferencesService.getItem<IUser>('USER');
    this.user = this.responsedata.data as IUser
    this.getExams();
    
  }

  async getExams() {
    try {
      this.exams = await this.homeService.getExams(this.responsedata.account.idUsuario)
      this.exams.sort((a, b) => new Date(b.creationDate).valueOf() - new Date(a.creationDate).valueOf());
      this.exams.forEach(exam => {
        exam.status = exam.respondidas === exam.numeroPreguntas ? 1 : 2
      });
      this.exams.splice(0, 1)
    } catch (error) {
      console.error(error);

    }

  }

}