import { Component, OnInit } from "@angular/core";
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

  exams = [
    { id: 1, date: '12/03/23', progress: 79, questions: 162, answers: 123, status: 1 },
    { id: 2, date: '02/03/23', progress: 65, questions: 162, answers: 100, status: 2 },
    { id: 3, date: '23/02/23', progress: 38, questions: 162, answers: 67, status: 2 },
    { id: 4, date: '09/01/23', progress: 15, questions: 162, answers: 32, status: 3 },
  ]

  isNew = false;
  isTryAccount = false;
  isExpireAccount = false;

  constructor(private preferencesService: PreferencesService) {
    
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.responsedata = this.preferencesService.getItem<IUser>('USER');
    this.user = this.responsedata.data as IUser
    
    switch(this.responsedata.account.estatus) {
      case EAcountStatus.NEW:
        this.isNew = true;
        break;

      case EAcountStatus.TRY:
        this.isTryAccount = true;
        break;

      case EAcountStatus.EXPIRE:
        this.isExpireAccount = true;
        break;
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