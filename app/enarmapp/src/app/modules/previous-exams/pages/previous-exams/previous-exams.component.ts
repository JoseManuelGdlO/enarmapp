import { Component, OnInit } from "@angular/core";
import { PreviousExamsService } from "../../services/previous-exams.service";

@Component({
    templateUrl: './previous-exams.component.html',
    styleUrls: ['./previous-exams.component.scss']
  })
  export class PreviousExamsComponent implements OnInit {

    constructor(
      public previousexamsService: PreviousExamsService
    ){

    }

    async ngOnInit(): Promise<void> {
        console.log("Hola");
    }


  }