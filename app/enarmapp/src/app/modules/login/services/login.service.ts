import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PreferencesService } from "src/app/shared/services/preferences.service";
import { API_URL } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    constructor(
        private httpclient:HttpClient,
        private preferenceSession: PreferencesService
    ){

    }

    login(email: string, password: string):Promise<any> {
        const url = API_URL + '/auth/login'
        return new Promise ( (resolve, reject) => {
            this.httpclient.post(url, {password, email}).subscribe( (data) => {
                resolve(data)
            }, (error: any) => {
                reject(error)
            })

        })
    }
}