import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ExamService{
    constructor(
        public httpclient:HttpClient
    ){

    }

    getExam(id: number): Promise<any> {
        const url = API_URL + '/exam/exam-detail?exam=' + id
        return new Promise((resolve, reject) => {
            this.httpclient.get(url).subscribe((data: any) => {
                resolve(data)
            }, (error: any) => {
                reject(error)
            })

        })
    }

}