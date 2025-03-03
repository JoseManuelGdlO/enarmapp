import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'app/modules/admin/services/admin.service';

export interface DialogData {
  selection: string;
}

@Component({
  selector: 'app-labs-modal',
  templateUrl: './labs-modal.component.html',
  styleUrls: ['./labs-modal.component.scss']
})
export class LabsModalComponent {
  categorieForm: FormGroup;
  isLoadingModal = false;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<LabsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {
    this.categorieForm = this.fb.group({
      Nombre: [{ value: data.selection === 'ADD' ? data.LabName : 'Laboratorio' }],
      subCategoria: ['']
    });
  }

  async addCategory() {
    if (this.isLoadingModal) return;

    if (this.categorieForm.invalid) {
      this.error = true;
      return;
    }

    this.isLoadingModal = true;

    const body = [{
      category: this.categorieForm.value.Nombre,
      subcategories: [this.categorieForm.value.subCategoria]
    }];

    try {
      await this.adminService.addCategory(body);
      this.snackBar.open('Datos guardados exitosamente', 'Cerrar', { duration: 3000, panelClass: ['success-snackbar'] });
      this.dialogRef.close(true); // Close modal & return success flag
    } catch (error) {
      console.error('Error:', error);
      this.snackBar.open('Error al guardar', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
    } finally {
      this.isLoadingModal = false;
    }
  }
}
