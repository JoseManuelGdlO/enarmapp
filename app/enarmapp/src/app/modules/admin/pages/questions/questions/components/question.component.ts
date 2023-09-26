import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { QuillEditorComponent } from "ngx-quill";
import Quill from "quill";
import { transformTextb64 } from "src/app/shared/utils/transform.utils";

@Component({
    selector: 'enarm-admin-question',
    templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {



    @Output() remove = new EventEmitter()
    question: any = {
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
    }

    @Input('question') set setQuestion(question: any) {
        if (question) {
            this.question = question
        }
    }

    @Input('index') indexQuestion!: number
    @ViewChild('editor') editor!: QuillEditorComponent

    showError: string = ''

    constructor() { }

    ngOnInit(): void {
        this.question.orden = this.indexQuestion
    }

    createQuill($event: any, item: any) {
        if(item.retroalimentacion) {
            $event.clipboard.dangerouslyPasteHTML(0, transformTextb64(item.retroalimentacion, false))
        }
    }

    createQuillDescirption($event: any) {
        if (this.question.resumen) {
            $event.clipboard.dangerouslyPasteHTML(0, transformTextb64(this.question.resumen, false))
        }
    }

    createQuillBiblio($event: any) {
        if (this.question.bibliografia) {
            $event.clipboard.dangerouslyPasteHTML(0, transformTextb64(this.question.bibliografia, false))
        }
    }

    getImage(event: any, item: any) {
        const selectedfile = event.target.files;
        if (selectedfile.length > 0) {
            const [imageFile] = selectedfile;
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const srcData = fileReader.result;
                item.imagen = { data: srcData, mimetype: imageFile.type, size: imageFile.size }
                
            };
            fileReader.readAsDataURL(imageFile);
        }

    }

    quillChange(event: any, type: 'resumen' | 'bibliografia') {
        if (event.html) {
            this.question[type] = transformTextb64(event.html)
        }
    }

    addAnswer() {
        this.question.answers.push({
            respuesta: '',
            retroalimentacion: '',
            isCorrecta: false
        })
    }

    removeAnswer(index: number) {
        this.showError = ''
        if(this.question.answers.length > 1){
            this.question.answers.splice(index, 1)
        } else {
            this.showError = 'No puedes eliminar todas las respuestas'
        }
    }

    quillAnsewerChange($event: any, item: any) {
        if ($event.html) {
            item.retroalimentacion = transformTextb64($event.html)
        }
    }

}