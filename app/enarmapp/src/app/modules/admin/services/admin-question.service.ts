import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AdminQuestionService {
    constructor(
        public httpclient: HttpClient
    ) {

    }

    getQuestions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.get(`${API_URL}/questions/all`).subscribe((response: any) => {
                resolve(response.rows);
            }, reject);
        })
    }
}