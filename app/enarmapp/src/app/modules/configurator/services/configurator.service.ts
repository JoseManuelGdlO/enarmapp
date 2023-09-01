import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ConfiguratorService {
    constructor(
        public httpclient: HttpClient
    ) {

    }

    getCategories(): Promise<any> {
        const url = API_URL + '/questions/categories'
        return new Promise((resolve, reject) => {
            this.httpclient.get(url).subscribe((data) => {
                resolve(data)
            }, (error: any) => {
                reject(error)
            })
        })
    }

    getPhrases(): Promise<any> {
        const url = API_URL + '/others/frases'
        return new Promise((resolve, reject) => {
            this.httpclient.get(url).subscribe((data) => {
                resolve(data)
            }, (error: any) => {
                reject(error)
            })
        })
    }

    addExam(body: any): Promise<any> {
        const url = API_URL + '/exam/add-exam'
        return new Promise((resolve, reject) => {
            this.httpclient.post(url, body).subscribe((data) => {
                resolve(data)
            }, (error: any) => {
                reject(error)
            })
        })
    }
}