import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    constructor(
        public httpclient:HttpClient
    ){

    }

    login(passwords: string):Promise<any> {
        const url = API_URL + '/login'
        return new Promise ( (resolve, reject) => {
            this.httpclient.post(url, {contrasena:passwords, usuario: 'sdfsd'}).subscribe( data => {
                resolve(data)
            }), (error: any) => {
                reject(error)
            }

        })
    }
}