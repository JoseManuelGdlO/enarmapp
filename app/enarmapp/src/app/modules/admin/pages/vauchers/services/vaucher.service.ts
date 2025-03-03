import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class VauchersService {
    constructor(
        public httpclient: HttpClient
    ) {

    }

    getVauchers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.get(`${API_URL}/vouchers`).subscribe((response: any) => {
                resolve(response.data);
            }, reject);
        })
    }

    createVaucher(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.post(`${API_URL}/vouchers`, body).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    updateVaucher(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.put(`${API_URL}/vouchers/${body.id}`, body).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    removeVaucher(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.delete(`${API_URL}/vouchers/${id}`).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }


}