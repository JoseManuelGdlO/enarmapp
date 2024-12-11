import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PreviousExamsService{
    constructor(
        public httpclient:HttpClient
    ){

    }

}