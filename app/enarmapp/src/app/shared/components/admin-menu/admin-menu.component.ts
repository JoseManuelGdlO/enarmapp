import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'enarm-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {
    @Input() current = 'usuarios'

    constructor(
        public router: Router,
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
            default:
                break;
        }
    }

}