import { SocialAuthService } from "@abacritt/angularx-social-login";
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
        public preferencesService: PreferencesService,
        public socialAuthService: SocialAuthService
    ) {

    }

    ngOnInit() {

    }

    async logout() {
        await this.preferencesService.clearAllItems();
        try {
            await this.socialAuthService.signOut()
            this.router.navigateByUrl('login');

        } catch (error) {
            console.log(error)
            this.router.navigateByUrl('login');
        }

    }
}