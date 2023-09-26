import { Component, OnInit, ViewChild } from "@angular/core";
import { ICategory, ISubcategory } from "src/app/shared/interfaces/categories.interface";
import { AdminService } from "../../../services/admin.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { AdminQuestionService } from "../../../services/admin-question.service";
import { transformTextb64 } from "src/app/shared/utils/transform.utils";
import { QuillEditorComponent } from "ngx-quill";

@Component({
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

    isEdditing = false
    id!: number

    clinicCase: {name: string, category: ISubcategory, image: any, lenguague: string, resume: string, questions: any} = {
        name: '',
        category: {categoria: '', id: 0, value: '', Nombre: '', fkid_categoria: 0},
        image: '',
        lenguague: 'es',
        resume: '',
        questions: [
            {
                orden: 0,
                pregunta: '',
                resumen: '',
                bibliografia: '',
                imagen: '',
                subrayadoInicio: 0,
                subrayadoFin: 0,
                answers: [{
                    respuesta: '',
                    retroalimentacion: '',
                    isCorrecta: false
                }]
            }]
    }

    @ViewChild('editor') editor!: QuillEditorComponent

    categories: Array<ISubcategory> = []

    showError: string = ''
    succesMessage = ''

    constructor(
        public adminService: AdminService,
        public router: Router,
        public quesitonService: AdminQuestionService,
        public route: ActivatedRoute
        ) {}

    ngOnInit(): void {
        this.getConfigurations();

        this.route.paramMap.subscribe((params: ParamMap) => {
            const id = params.get('id');
            if (id) {
                this.isEdditing = true
                this.id = Number(id)
                this.getQuestion()
            }
        });
    }

    getQuestion() {
        this.quesitonService.getQuestion(this.id).then((response: any) => {
            this.clinicCase.name = response.nombre
            this.clinicCase.category = response.subcategoria
            this.clinicCase.image = response.imagen
            this.clinicCase.lenguague = response.isEspanol ? 'es' : 'en'
            this.clinicCase.resume = transformTextb64(response.descripcion, false)
            this.editor.writeValue(this.clinicCase.resume)
            this.clinicCase.questions = response.questions
            this.id = response.id
        })
    }

    reviewClinickImage(event: any, item:any) {
        console.log('event', event);
        
        const selectedfile = event.target.files;
        if (selectedfile.length > 0) {
        const [imageFile] = selectedfile;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const srcData = fileReader.result;
            item.image = { data: srcData, mimetype: imageFile.type, size: imageFile.size }
            
        };
        fileReader.readAsDataURL(imageFile);
        }
        
    }

    quillChange(event: any, item: any) {
        if(event.html){
            item.resume = transformTextb64(event.html)
        }
    }

    async getConfigurations() {
        const categories: Array<ICategory> = await this.adminService.getCategories();

        for (const item of categories) {
            for (const sub of item.subcategoria) {
                sub.value = sub.Nombre
                this.categories.push(sub);
            }
        }
    }

    addQuestion() {
        this.clinicCase.questions.push({
            orden: 0,
            pregunta: '',
            resumen: '',
            bibliografia: '',
            imagen: '',
            subrayadoInicio: 0,
            subrayadoFin: 0,
            answers: [{
                respuesta: '',
                retroalimentacion: '',
                isCorrecta: false
            }]
        })
    }

    removeQuestion(index: number) {
        if (this.clinicCase.questions.length > 1){
            this.clinicCase.questions.splice(index, 1)
        } else {
            this.showError = 'No puedes eliminar todas las preguntas'
        }
    }
   
    async save() {
        this.showError = ''
        if (this.clinicCase.name === '' || this.clinicCase.category.Nombre === '' || this.clinicCase.resume === ''){
            this.showError = 'Los campos Nombre, categoria y/o resumen son requeridos'
            return
        }

        let errorFlags = false

        for (const item of this.clinicCase.questions) {
            if(item.name === '' || item.resume === ''){
                errorFlags = true
            }

            for (const answer of item.answers) {
                if(answer.name === '' || answer.resume === ''){
                    errorFlags = true
                }
            }
        }

        if (errorFlags) {
            this.showError = 'Alguno de los campos de las preugntas y/o respuestas estan vacios'
            return
        }

        console.log('clicnic', this.clinicCase);
        console.log('error', errorFlags);
        const body = [{
            idSubcategoria: this.clinicCase.category.id,
            nombre: this.clinicCase.name,
            descipcion: this.clinicCase.resume,
            imagen: this.clinicCase.image || '',
            isEspanol: this.clinicCase.lenguague === 'es' ? true : false,
            preguntas: this.clinicCase.questions
        }]

        try {
            const response = await this.quesitonService.addClinicalCase(body);
            if (response) {
                this.succesMessage = 'Se ha guardado correctamente'
                this.router.navigateByUrl('/admin/questions');
            }
        } catch (error) {
            this.showError = 'Ocurrio un error al guardar'
            console.log('error', error);
        }
        
    }


}