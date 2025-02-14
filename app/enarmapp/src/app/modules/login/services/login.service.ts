import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PreferencesService } from "app/shared/services/preferences.service";
import { API_URL } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    constructor(
        private httpclient:HttpClient,
        private preferenceSession: PreferencesService,
        private router: Router
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

    loginForId(email: string, id: string):Promise<any> {
        const url = API_URL + '/auth/login-id'
        return new Promise ( (resolve, reject) => {
            this.httpclient.post(url, {id, email}).subscribe( (data: any) => {
                resolve(data)
            }, (error: any) => {
                reject(error)
            })

        })
    }

    getUnivercities():Promise<any> {
        const url = API_URL + '/others/universidades'
        return new Promise ( (resolve, reject) => {
            this.httpclient.get(url).subscribe( (data: any) => {
                resolve(data.response)
            }, (error: any) => {
                reject(error)
            })

        })
    }

    getEspecialities():Promise<any> {
        const url = API_URL + '/others/especialidades'
        return new Promise ( (resolve, reject) => {
            this.httpclient.get(url).subscribe( (data: any) => {
                resolve(data.response)
            }, (error: any) => {
                reject(error)
            })

        })
    }
    
    getStudentsTypes():Promise<any> {
        const url = API_URL + '/others/student-type?type=signup'
        return new Promise ( (resolve, reject) => {
            this.httpclient.get(url).subscribe( (data: any) => {
                resolve(data.response)
            }, (error: any) => {
                reject(error)
            })

        })
    }

    getEnarmDates():Promise<any> {
        const url = API_URL + '/others/enarm-date'
        return new Promise ( (resolve, reject) => {
            this.httpclient.get(url).subscribe( (data: any) => {
                resolve(data.response)
            }, (error: any) => {
                reject(error)
            })

        })
    }

    register(body: any):Promise<any> {
        const url = API_URL + '/auth/register'
        return new Promise ( (resolve, reject) => {
            this.httpclient.post(url, body).subscribe( (data) => {
                resolve(data)
            }, (error: any) => {
                reject(error)
            })

        })
    }

    logout() {
        const url = API_URL + '/auth/logout'
            this.httpclient.post(url, {})
    }
}