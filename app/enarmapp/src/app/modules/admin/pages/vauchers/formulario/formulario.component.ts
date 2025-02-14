import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FuseAlertComponent } from '@fuse/components/alert';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IVaucher } from 'app/shared/interfaces/vaucher.interface';
import { VauchersService } from '../services/vaucher.service';

@Component({
    standalone: true,
    selector: 'app-incidencias-formulario',
    templateUrl: './formulario.component.html',
    imports: [
        CommonModule,
        FuseAlertComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        TextFieldModule,
            MatDatepickerModule,
    ]
})
export class VauchersFormulario {
    regresaVer = false;
    modo: string = 'nuevo';
    item: IVaucher;
    formFieldHelpers: string[] = [''];
    ttituloFormulario = '';
    enProceso = false;
    userProfile: any
    constructor(
        public dialogRef: MatDialogRef<VauchersFormulario>,
        @Inject(MAT_DIALOG_DATA) public data: { modo: string, item: IVaucher },
        private vauchersService: VauchersService,
        private dialog: MatDialog
    ) {
        this.modo = data.modo;
        this.item = data.item;
        switch (data.modo) {
            case 'ver':
                this.ttituloFormulario = 'Cupones';
                break;
            case 'nuevo':
                this.ttituloFormulario = 'Nuevo cupon';
                break;
            case 'editar':
                this.ttituloFormulario = 'Editar Cupon';
                break;
            case 'eliminar':
                this.ttituloFormulario = 'Eliminar Cupon';
                break;
        }
    }

    changeMode(modo: string) {
        this.modo = modo;
        this.regresaVer = modo == 'ver' ? false : true;
    }

    async createVaucher() {
        this.enProceso = true;
        const peticonGuardar: IVaucher = {
            name: this.item.name,
            code: this.item.code,
            discount: this.item.discount,
            type: this.item.type,
            usage: this.item.usage,
            limit_usage: this.item.limit_usage,
            expiration_date: new Date(this.item.expiration_date).toISOString().split('T')[0],

        }

        console.log(peticonGuardar);
        try { 
            const respone = await this.vauchersService.createVaucher(peticonGuardar);
            this.enProceso = false;
            this.dialogRef.close({ modo: this.modo, huboCambios: true });
        } catch (error) {
            console.log('error', error);
        } finally {
            this.enProceso = false;
        }
    }

    async saveVaucher() {
        this.enProceso = true;
        const peticonActualizar: IVaucher = {
            id: this.item.id,
            name: this.item.name,
            code: this.item.code,
            discount: this.item.discount,
            type: this.item.type,
            usage: this.item.usage,
            limit_usage: this.item.limit_usage,
            expiration_date: new Date(this.item.expiration_date).toISOString().split('T')[0],
        }

        console.log(peticonActualizar);

        try {
            const respone = await this.vauchersService.updateVaucher(peticonActualizar);
            this.dialogRef.close({ modo: this.modo, huboCambios: true });
        } catch (error) {
            console.log('error', error);
        } finally {
            this.enProceso = false;
        }
    }

    async eliminarVacuher() {
        this.enProceso = true;
        try {
            const respone = await this.vauchersService.removeVaucher(Number(this.item.id));
            this.dialogRef.close({ modo: this.modo, huboCambios: true });
        } catch (error) {
            console.log('error', error);
        } finally {
            this.enProceso = false;
        }
    }
    cerrar(): void {
        this.dialogRef.close({ modo: this.modo });
    }
}