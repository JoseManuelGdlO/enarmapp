import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICategory } from "src/app/shared/interfaces/categories.interface";
import { IConfiguration } from "src/app/shared/interfaces/configurations.interface";
import { ILaboratory } from "src/app/shared/interfaces/laboratory.interface";
import { ISubscription } from "src/app/shared/interfaces/subscriptions.interface";
import { IUserType } from "src/app/shared/interfaces/user-type.interface";
import { API_URL } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(
        public httpclient: HttpClient
    ) {

    }

    getUsers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.get(`${API_URL}/enarm-students`).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    getUserTypes(): Promise<Array<IUserType>> {
        return new Promise((resolve, reject) => {
            this.httpclient.get<IUserType>(`${API_URL}/others/student-type`).subscribe((response: any) => {
                resolve(response as Array<IUserType>);
            }, reject);
        })
    }

    getSusbcriptions(): Promise<Array<ISubscription>> {
        return new Promise((resolve, reject) => {
            this.httpclient.get(`${API_URL}/others/subscripciones`).subscribe((response: any) => {
                resolve(response as Array<ISubscription>);
            }, reject);
        })
    }

    updateUser(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.put(`${API_URL}/enarm-students/upload-profile`, body).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    resetPassword(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.put(`${API_URL}/auth/reset-password`, { id }).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    updateSubscription(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.put(`${API_URL}/others/subscription`, body).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    getAllConfigurations(): Promise<Array<IConfiguration>> {
        return new Promise((resolve, reject) => {
            this.httpclient.get(`${API_URL}/others/configuration-all`).subscribe((response: any) => {
                resolve(response as Array<IConfiguration>);
            }, reject);
        })
    }

    updateConfigurations(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.put(`${API_URL}/others/configuration`, body).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    getLaboratories(): Promise<Array<ILaboratory>> {
        return new Promise((resolve, reject) => {
            this.httpclient.get(`${API_URL}/others/laboratory`).subscribe((response: any) => {
                resolve(response as Array<ILaboratory>);
            }, reject);
        })
    }

    updateLaboratory(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (body.id) {
                this.httpclient.put(`${API_URL}/others/laboratory`, body).subscribe((response: any) => {
                    resolve(response);
                }, reject);
                return
            } else {
                this.httpclient.post(`${API_URL}/others/laboratory`, { name: body.name }).subscribe((response: any) => {
                    resolve(response);
                }, reject);
            }
        })
    }

    removeLaboratory(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.delete(`${API_URL}/others/laboratory?id=${id}`).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    removeLaboratorySubcategory(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.delete(`${API_URL}/others/laboratory-subcategory?id=${id}`).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    laboratorySubCategory(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (body.id) {
                this.httpclient.put(`${API_URL}/others/laboratory-subcategory`, body).subscribe((response: any) => {
                    resolve(response);
                }, reject);
                return
            } else {
                this.httpclient.post(`${API_URL}/others/laboratory-subcategory`, body).subscribe((response: any) => {
                    resolve(response);
                }, reject);
            }
        })
    }

    getCategories(): Promise<Array<ICategory>> {
        return new Promise((resolve, reject) => {
            this.httpclient.get<Array<ICategory>>(`${API_URL}/questions/categories`).subscribe((response: any) => {
                resolve(response.response as Array<ICategory>);
            }, reject);
        })
    }

    addCategory(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.post(`${API_URL}/questions/add-category`, body).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    addSubCategory(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.post(`${API_URL}/questions/add-subcategory`, body).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    editSubCategory(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpclient.put(`${API_URL}/questions/edit-subcategory`, body).subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

}