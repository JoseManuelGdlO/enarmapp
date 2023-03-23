import { Component, Input, OnInit } from "@angular/core";
import { ConfiguratorService } from "src/app/modules/configurator/services/configurator.service";

@Component({
    selector: 'enarm-toast-quotes',
    templateUrl: './toast-quotes.component.html',
    styleUrls: ['./toast-quotes.component.scss']
})
export class ToastQuotesComponent implements OnInit {
    
    @Input() quote = '';
    @Input() author = '';
    citas:any = [];
    error = false;

    constructor(
        private configuratorService: ConfiguratorService
    ){

    }

    async ngOnInit(){
        console.log('QUOTE', this.quote);
        console.log('AUTHOR', this.author);
        this.setQuote();
    }

    async setQuote(){
        try{
            this.citas = await this.configuratorService.getPhrases();
            if (this.citas){
                console.log(this.citas);
                let i = Math.floor(Math.random() * (this.citas.length - 0) + 0);
                this.quote = this.citas[i].frase;
                this.author = this.citas[i].autor;
            }
        }catch (error) {
            this.error = true;
        }
    }
}