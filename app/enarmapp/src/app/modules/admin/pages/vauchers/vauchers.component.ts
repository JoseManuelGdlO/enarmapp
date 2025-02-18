import { Component, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { IVaucher } from "app/shared/interfaces/vaucher.interface";
import { VauchersFormulario } from "./formulario/formulario.component";
import { VauchersService } from "./services/vaucher.service";

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
        public vouchersService: VauchersService
    ) {
    }

    ngOnInit(): void {
       this.getCatalog();
    }

    async getCatalog() {
        try {
            const response = await this.vouchersService.getVauchers();
            this.vauchers = response
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
              this.getCatalog();
              
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