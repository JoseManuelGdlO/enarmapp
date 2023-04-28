import { Component, OnInit } from "@angular/core";
import { ICategory } from "src/app/shared/interfaces/categories.interface";
import { AdminService } from "../../../services/admin.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

    categories!: Array<ICategory>

    questions: Array<any> = [{}]

    showError: string = ''

    constructor(public adminService: AdminService, public router: Router) {}

    ngOnInit(): void {
        this.getConfigurations();
    }

    async getConfigurations() {
        this.categories = await this.adminService.getCategories();
    }

    addQuestion() {
        this.questions.push({})
    }

    removeQuestion(index: number) {
        if(this.questions.length > 1){
            this.questions.splice(index, 1)
        } else {
            this.showError = 'No puedes eliminar todas las preguntas'
        }
    }


}