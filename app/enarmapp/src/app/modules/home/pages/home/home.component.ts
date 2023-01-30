import { Component, OnInit } from "@angular/core";
import { HomeService } from "../../services/home.service";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  exams = [
    { id: 1, date: '12/03/23', progress: 79, questions: 162, answers: 123, status: 1 },
    { id: 2, date: '02/03/23', progress: 65, questions: 162, answers: 100, status: 2 },
    { id: 3, date: '23/02/23', progress: 38, questions: 162, answers: 67, status: 2 },
    { id: 4, date: '09/01/23', progress: 15, questions: 162, answers: 32, status: 3 },
  ]

  constructor() {
    
  }

  ngOnInit(): void {
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