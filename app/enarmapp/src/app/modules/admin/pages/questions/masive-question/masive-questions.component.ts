import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: './masive-questions.component.html',
    styleUrls: ['./masive-questions.component.scss']
})
export class MasiveQuestions implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {
    }


}