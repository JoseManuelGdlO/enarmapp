import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'enarm-toast-quotes',
    templateUrl: './toast-quotes.component.html',
    styleUrls: ['./toast-quotes.component.scss']
})
export class ToastQuotesComponent implements OnInit {
    
    @Input() quote = '';
    @Input() author = '';
    constructor(
        
    ){

    }

    async ngOnInit(): Promise<void> {
        console.log('QUOTE', this.quote);
        console.log('AUTHOR', this.author);
        
    }
}