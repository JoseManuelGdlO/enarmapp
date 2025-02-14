import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  selection: string;
}

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent {
  categorieForm: FormGroup;
  isLoadingModal = false;

  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.categorieForm = this.fb.group({
      Nombre: ['', data.selection === 'ADD' ? Validators.required : null],
      subCategoria: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.categorieForm.invalid) {
      this.snackBar.open('Falta información por llenar', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.isLoadingModal = true;
    setTimeout(() => {
      this.isLoadingModal = false;
      this.snackBar.open('Datos guardados exitosamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
      this.dialogRef.close(this.categorieForm.value);
    }, 2000);
  }

  close(): void {
    this.dialogRef.close();
  }
}
