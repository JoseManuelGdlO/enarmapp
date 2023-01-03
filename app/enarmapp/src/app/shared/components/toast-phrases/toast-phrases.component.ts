import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'enarm-toast-phrases',
    templateUrl: './toast-phrases.component.html',
    styleUrls: ['./toast-phrases.component.scss']
})
export class ToastPhrasesComponent implements OnInit {
    
    @Input() encabezado = '';
    @Input() cuerpo = '';
    constructor(
        
    ){

    }

    async ngOnInit(): Promise<void> {
        
    }
}