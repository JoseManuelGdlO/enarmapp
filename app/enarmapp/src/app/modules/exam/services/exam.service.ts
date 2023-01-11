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

}