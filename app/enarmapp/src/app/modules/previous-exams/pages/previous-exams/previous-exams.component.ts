import { Component, OnInit } from "@angular/core";
import { PreviousExamsService } from "../../services/previous-exams.service";

@Component({
  templateUrl: './previous-exams.component.html',
  styleUrls: ['./previous-exams.component.scss']
})
export class PreviousExamsComponent implements OnInit {

  exams = [
    { id: 1, date: '12/03/23', progress: 79, questions: 162, answers: 123, status: 1 },
    { id: 2, date: '02/03/23', progress: 65, questions: 162, answers: 100, status: 2 },
    { id: 3, date: '23/02/23', progress: 38, questions: 162, answers: 67, status: 2 },
    { id: 4, date: '09/01/23', progress: 15, questions: 162, answers: 32, status: 3 },
  ]

  ngOnInit(): void {

  }

}