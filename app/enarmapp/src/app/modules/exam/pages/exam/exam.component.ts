import { Component, OnInit } from "@angular/core";
import { ExamService } from "../../services/exam.service";

@Component({
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss']
  })
  export class ExamComponent implements OnInit {

    constructor(
      public examService: ExamService
    ){

    }

    async ngOnInit(): Promise<void> {
        console.log("Hola");
    }


  }