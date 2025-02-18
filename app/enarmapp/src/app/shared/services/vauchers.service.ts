import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PreferencesService } from "./preferences.service";
import { API_URL } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class VauchersService {

    constructor(
        private httpclient:HttpClient,
        private preferenceSession: PreferencesService,
    ){

    }

    
    
        getPeerCode(code: string):Promise<any> {
            const url = API_URL + '/vouchers/one?code=' + code
            return new Promise ( (resolve, reject) => {
                this.httpclient.get(url).subscribe( (data: any) => {
                    resolve(data.data)
                }, (error: any) => {
                    reject(error)
                })
    
            })
        }

}