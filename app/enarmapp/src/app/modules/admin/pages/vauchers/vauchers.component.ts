import { Component, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { IVaucher } from "app/shared/interfaces/vaucher.interface";
import { VauchersFormulario } from "./formulario/formulario.component";

@Component({
    templateUrl: './vauchers.component.html',
    styleUrls: ['./vauchers.component.scss']
})
export class VacuhersComponent implements OnInit {
    isLoading = true;
    searchInput: string = '';
    vauchers!: Array<IVaucher>;

    constructor(
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
       this.getCatalog();
    }

    async getCatalog() {
        try {
            this.vauchers = [
                { code: '123', name: 'Navidad', discount: 10, expiration_date: '2021-10-10', id: 1, limit_usage: 10, type: 'percentage', usage: 10 },
                { code: '123', name: 'Halloween', discount: 10, expiration_date: '2021-10-10', id: 2, limit_usage: 10, type: 'percentage', usage: 10 },
                { code: '123', name: 'San Juan', discount: 10, expiration_date: '2021-10-10', id: 3, limit_usage: 10, type: 'percentage', usage: 10 },
            ]

        }catch (error) {
            console.log(error);
        } finally {
            this.isLoading = false;
        }

    }


    addVaucher(modo: 'ver' | 'eliminar' | 'nuevo', item?: IVaucher) {
        const elemento = item;
        const data = {
            item: Object.assign({}, elemento),
            modo: modo
        }
        const formularioModal = this.dialog.open(VauchersFormulario, {
            width: '800px',
            data: data
        });
        formularioModal.afterClosed().subscribe(respuesta => {
            if (respuesta) {
              console.log('creado');
              
            }
        });
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    get filterVauchers () {
        if(!this.vauchers) return [];

        if(this.searchInput.length < 2) return this.vauchers;
        return this.vauchers.filter(vaucher => {
            return vaucher.name.toLowerCase().includes(this.searchInput.toLowerCase());
        });
    }

}