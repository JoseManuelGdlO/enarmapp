import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { PreferencesService } from "../../services/preferences.service";
import { SocialAuthService } from "@abacritt/angularx-social-login";

@Component({
    selector: 'enarm-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {
    @Input() current = 'usuarios'

    constructor(
        public router: Router,
        public preferencesService: PreferencesService,
        public socialAuthService: SocialAuthService
    ){

    }

    async ngOnInit(): Promise<void> {
        
    }

    go() {
        switch (this.current) {
            case 'usuarios':
                this.router.navigate(['/admin'])
                break;
            case 'subscripciones':
                this.router.navigate(['/admin/subscripciones'])
                break;
            case 'configurations':
                this.router.navigate(['/admin/configurations'])
                break;
            case 'laboratory':
                this.router.navigate(['/admin/laboratory'])
                break;
            case 'categories':
                this.router.navigate(['/admin/categories'])
                break;
            case 'questions':
                this.router.navigate(['/admin/questions'])
                break;
            case 'logout':
                this.logout()
                break
            default:
                break;
        }
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