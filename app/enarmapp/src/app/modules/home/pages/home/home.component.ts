import { Component, OnInit } from "@angular/core";
import { ChartType } from "angular-google-charts";
import { EAcountStatus } from "src/app/shared/interfaces/account-status.enum";
import { IUser } from "src/app/shared/interfaces/user.interface";
import { PreferencesService } from "src/app/shared/services/preferences.service";
import { HomeService } from "../../services/home.service";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!: IUser
  responsedata!: any;

  title = 'Browser market shares at a specific website, 2014';
   type = ChartType.PieChart;
   data = [
      ['Firefox', 45.0],
      ['IE', 26.8],
      ['Chrome', 12.8],
      ['Safari', 8.5],
      ['Opera', 6.2],
      ['Others', 0.7] 
   ];
   columnNames = ['Browser', 'Percentage'];
   options = {    
   };
   width = 280
   height = 280;

  exams = [
    { id: 1, progress: 79, questions: 162, answers: 123, status: 1, creationDate: '', respondidas: 1, numeroPreguntas: 1, isEspanol: 1 },
    { id: 2, progress: 65, questions: 162, answers: 100, status: 2, creationDate: '', respondidas: 1, numeroPreguntas: 1, isEspanol: 1 },
    { id: 3, progress: 38, questions: 162, answers: 67, status: 2, creationDate: '', respondidas: 1, numeroPreguntas: 1, isEspanol: 1 },
    { id: 4, progress: 15, questions: 162, answers: 32, status: 3, creationDate: '', respondidas: 1, numeroPreguntas: 1, isEspanol: 1 },
  ]

  isNew = false;
  isTryAccount = false;
  isExpireAccount = false;

  currentExam!: { isEspanol: number, id: number, progress: number, questions: number, answers: number, status: number, creationDate: string, respondidas: number, numeroPreguntas: number };

  constructor(private preferencesService: PreferencesService, private homeService: HomeService) {

  }

  ngOnInit(): void {
    this.getData()
    this.getExams();
  }

  getData() {
    this.responsedata = this.preferencesService.getItem<IUser>('USER');
    this.user = this.responsedata.data as IUser

    // switch (this.responsedata.account.estatus) {
    //   case EAcountStatus.NEW:
    //     this.isNew = true;
    //     break;

    //   case EAcountStatus.TRY:
    //     this.isTryAccount = true;
    //     break;

    //   case EAcountStatus.EXPIRE:
    //     this.isExpireAccount = true;
    //     break;
    // }
  }

  async getExams() {
    try {
      this.exams = await this.homeService.getExams(this.responsedata.account.idUsuario)
      this.exams.sort((a, b) => new Date(b.creationDate).valueOf() - new Date(a.creationDate).valueOf());
      this.exams.forEach(exam => {

        exam.status = exam.respondidas === exam.numeroPreguntas ? 1 : 2     
      });
      this.currentExam = this.exams[0];
      this.exams.splice(0, 1)
    } catch (error) {
      console.error(error);

    }

  }

  async changeToTail() {
    this.isNew = false
    this.isTryAccount = true;
    try {
      await this.homeService.changeAccontStatus(this.responsedata.account.idUsuario, EAcountStatus.TRY)
      this.responsedata.account.estatus = EAcountStatus.TRY;

      this.preferencesService.setItem('USER', this.responsedata);
    } catch (error) {
      console.error(error);

    }
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


}