import { Component, OnInit, ViewChild } from "@angular/core";
import { ISubscription } from "src/app/shared/interfaces/subscriptions.interface";
import { IUserType } from "src/app/shared/interfaces/user-type.interface";
import { AdminQuestionService } from "../../../services/admin-question.service";
import { IQuestion } from "src/app/shared/interfaces/question.interface";
import { Router } from "@angular/router";
import { transformTextb64 } from "src/app/shared/utils/transform.utils";

@Component({
    templateUrl: './list-questions.component.html',
    styleUrls: ['./list-questions.component.scss']
})
export class ListQuestionsComponent implements OnInit {

    userType!: Array<IUserType>
    subscriptions!: Array<ISubscription>;
    isLoadingModal = false


    questions!: Array<IQuestion>
    questionClone!: Array<IQuestion>

    isLoading = true

    constructor(
        public router: Router,
        public adminQuesitonService: AdminQuestionService
    ) {

    }

    async ngOnInit(): Promise<void> {
        await this.getQuestions()

        this.questionClone = [...this.questions]
        this.isLoading = false

    }

    async getQuestions() {
        this.questions = await this.adminQuesitonService.getQuestions();
        this.questions.forEach((x: IQuestion) => {
            x.clinic_description = transformTextb64(x.clinic_description, false)
        })
    }


    filter(value: any) {
        if (value.target.value.length <= 3) {
            this.questions = this.questionClone
            return
        }

        const filters = this.questionClone.filter((x: IQuestion) => x.resumen.toLowerCase().includes(value.target.value.toLowerCase())
                        || x.clinic_name.toLowerCase().includes(value.target.value.toLowerCase())
                        || x.pregunta.toLowerCase().includes(value.target.value.toLowerCase()))
        this.questions = filters
    }

    chooseQuestion(question?: IQuestion){
        if(question) {
            this.router.navigateByUrl(`/admin/questions/edit/${question.id}`)
        } else {
            this.router.navigateByUrl('/admin/questions/add')
        }
    }




}