import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PreferencesService } from "../../services/preferences.service";

@Component({
    selector: 'enarm-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Input() profile = 'Jose';

    isOpen = false;
    
    constructor(
        public router: Router,
        public preferencesService: PreferencesService
    ){

    }

    ngOnInit() { 
        
    }

    async logout() {
        await this.preferencesService.clearAllItems();
        this.router.navigateByUrl('login');
    }
}