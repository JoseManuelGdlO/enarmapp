import { Component, OnInit, ViewChild } from "@angular/core";
import { ISubscription } from "app/shared/interfaces/subscriptions.interface";
import { IUserType } from "app/shared/interfaces/user-type.interface";
import { AdminQuestionService } from "../../../services/admin-question.service";
import { IQuestion } from "app/shared/interfaces/question.interface";
import { Router } from "@angular/router";
import { transformTextb64 } from "app/shared/utils/transform.utils";
import { FormControl, FormGroup, UntypedFormControl } from "@angular/forms";

@Component({
    templateUrl: './list-questions.component.html',
    styleUrls: ['./list-questions.component.scss']
})
export class ListQuestionsComponent implements OnInit {

    userType!: Array<IUserType>
    subscriptions!: Array<ISubscription>;
    isLoadingModal = false

    selectedQuestion!: IQuestion;
    searchInputControl: UntypedFormControl = new UntypedFormControl();

    questions!: Array<IQuestion>
    questionClone!: Array<IQuestion>

    isLoading = true

    profileForm = new FormGroup({
        bibliografia: new FormControl(''),
        clinic_description: new FormControl(''),
        clinic_image: new FormControl(''),
        clinic_isEspanol: new FormControl(''),
        clinic_name: new FormControl(''),
        clinic_subcategory: new FormControl(''),
        id: new FormControl(''),
        idCasoclinico: new FormControl(''),
        imagen: new FormControl(''),
        orden: new FormControl(''),
        pregunta: new FormControl(''),
        resumen: new FormControl(''),
        subrayadoFin: new FormControl(''),
        subrayadoInicio: new FormControl(''),
        active: new FormControl('')
      });

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

      setValuesForm(questi?: IQuestion) {
        this.selectedQuestion = questi ? questi : {} as IQuestion;  
        if (!questi) {
          this.profileForm.reset()
          return
        }
        this.profileForm.patchValue({
          bibliografia: questi.bibliografia,
          clinic_description: questi.clinic_description,
          clinic_image: questi.clinic_image,
          clinic_name: questi.clinic_image,
          imagen: questi.imagen,
          pregunta: questi.pregunta,
          resumen: questi.resumen,
        });
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

    masiveQuestion() {
        this.router.navigateByUrl('/admin/questions/masive-questions')
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }


}