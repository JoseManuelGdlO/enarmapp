import { Component, Input, OnInit } from "@angular/core";


@Component({
    selector: 'enarm-toast-phrases',
    templateUrl: './toast-phrases.component.html',
    styleUrls: ['./toast-phrases.component.scss']
})
export class ToastPhrasesComponent implements OnInit {
    
    @Input() encabezado = '';
    @Input() cuerpo = '';
    datos = [];

    constructor(

    ){

    }

    async ngOnInit() {
        console.log('encABRZADO', this.encabezado);
        console.log('cuerpo', this.cuerpo);
    }


}