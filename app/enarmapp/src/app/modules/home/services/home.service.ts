import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class HomeService{
    constructor(
        public httpclient:HttpClient
    ){

    }

    changeAccontStatus(id: number, status: number):Promise<any> {
        const url = API_URL + '/auth/change-account-status'
        return new Promise ( (resolve, reject) => {
            this.httpclient.post(url, {id, status}).subscribe( (data) => {
                resolve(data)
            }, (error: any) => {
                reject(error)
            })

        })
    }

    getExams(id: number): Promise<any> {
        const url = API_URL + '/exam/exam-user-list?user=' + id
        return new Promise((resolve, reject) => {
            this.httpclient.get(url).subscribe((data: any) => {
                resolve(data.data)
            }, (error: any) => {
                reject(error)
            })

        })
    }

}