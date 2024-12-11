import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "environments/environment";

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

    addClinicalCase(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.post(`${API_URL}/questions/add-question`, body).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    getQuestion(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.get(`${API_URL}/questions/question?id=${id}`).subscribe((response: any) => {
                resolve(response.clinicCaseData);
            }, reject);
        })
    }
}