import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'app/modules/admin/services/admin.service';
import { categories } from '../../../mock-api/apps/ecommerce/inventory/data';

export interface DialogData {
  selection: string;
}

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent {
  categorieForm: FormGroup;
  isLoadingModal = false;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {

    const category = [{ value : data.category ? data.category.name : '', disabled: data.selection === 'ADDSub' || data.selection === 'EDITSUB' }];
    let subCategory = []

    if(data.selection === 'EDITSUB') { 
      subCategory.push({ value: data.subcategory.name, disabled: false });
    }
    this.categorieForm = this.fb.group({
      Nombre: category,
      subCategoria: subCategory
    });
  }

  async addCategory() {
    if (this.isLoadingModal) return;

    if (this.categorieForm.invalid) {
      this.error = true;
      return;
    }

    this.isLoadingModal = true;

    console.log(this.categorieForm.value.subCategoria, this.categorieForm.value.Nombre );

    const subcategory = [];

    if (this.categorieForm.value.subCategoria) {
      subcategory.push(this.categorieForm.value.subCategoria);
    }
    

    try {
      if (this.data.selection === 'EDITSUB') {
        await this.adminService.editSubCategory( {name: this.categorieForm.value.subCategoria} ,this.data.category.id);
      } else if (this.data.selection === 'ADDSub') {
        await this.adminService.addSubCategory({name: this.categorieForm.value.subCategoria}, this.data.category.id);
      } else  {
        const body = [{
          name: this.categorieForm.value.Nombre,
          subcategories: subcategory
        }];
        await this.adminService.addCategory(body);
      }
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
