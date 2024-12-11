import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import {Observable} from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { PreferencesService } from './preferences.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRoutingGuard  {


    constructor(public preferences: PreferencesService, private router: Router) {

    }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
        const response = await this.preferences.getItem<IUser>('USER');
        if(response) {
            return true
        }
        return this.router.navigate(['/login']).then(() => false);
  }
}