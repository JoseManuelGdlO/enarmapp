import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { EAcountStatus } from "src/app/shared/interfaces/account-status.enum";
import { ILaboratory, ILaboratorySubcategory } from "src/app/shared/interfaces/laboratory.interface";
import { ISubscription } from "src/app/shared/interfaces/subscriptions.interface";
import { IUserType } from "src/app/shared/interfaces/user-type.interface";
import { AdminService } from "../../services/admin.service";

@Component({
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss']
})
export class LaboratoryComponent implements OnInit {


  laboratory!: Array<ILaboratory>;

  laboratoryClone!: Array<ILaboratory>;
  isLoadingModal = false

  selectedLaboratory: any;
  selectedSubCategoryLaboratory!: ILaboratorySubcategory
  error = false
  resultSave = false
  errorResult = ''

  responsePassword: any

  isLoading = true
  @ViewChild('myModalClose') modalClose!: any;
  @ViewChild('myModalSubCategoryClose') modalSubCategoryClose!: any;

  laboratoryForm = new FormGroup({
    name: new FormControl(''),
  });

  subcategoryForm = new FormGroup({
    name: new FormControl(''),
    ejemplo: new FormControl(''),
    valor: new FormControl('')
  });



  constructor(
    private adminService: AdminService,
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.getLaboratories()

    this.laboratoryClone = [...this.laboratory]
    this.isLoading = false

  }

  setValuesForm(sub?: ILaboratorySubcategory) {
    this.selectedLaboratory = sub;
    if(!sub) {
      this.laboratoryForm.reset()
      return
    }
    this.laboratoryForm.patchValue({
      name: sub?.name,
    });
  }

  setValuesFormSubcategory(laboratory: any, item?: any) {
    const subcategory = item as ILaboratorySubcategory
    this.selectedSubCategoryLaboratory = subcategory
    this.selectedLaboratory = laboratory;

    if (!item) {
      this.subcategoryForm.reset()
      return
    }
    this.subcategoryForm.patchValue({
      name: subcategory?.name,
      ejemplo: subcategory?.ejemplo,
      valor: subcategory?.valor
    });

  }

  async deleteLaboratory(id: number) {
    try {
      await this.adminService.removeLaboratory(id)
      this.isLoading = true
      this.ngOnInit()
    } catch (error) {
      console.log('error', error);
    }
  }


  async onSubmit() {
    if (this.isLoadingModal) return;
    
    if (this.laboratoryForm.invalid) {
      this.error = true
      return;
    }

    this.isLoadingModal = true;

    const body: any = {
      id: this.selectedLaboratory?.id,
      name: this.laboratoryForm.value.name,
    }

    const filter = this.laboratoryClone.filter((x: ILaboratory) => x.name.toString().toLowerCase() === body.name.toString().toLowerCase())

    if (filter.length > 0) {
      this.isLoadingModal = false
      this.errorResult = 'Ya existe un laboratorio con ese nombre'
      return
    }
    try {
      await this.adminService.updateLaboratory(body)
      this.resultSave = true
      this.isLoading = true
      this.isLoadingModal = false
      this.ngOnInit()
      this.modalClose.nativeElement.click();

    } catch (error) {
      console.log('error', error);
      this.isLoadingModal = false
    }


  }

  async onSubmitSubcategory() {
    if (this.isLoadingModal) return;

    if (this.subcategoryForm.invalid) {
      this.error = true
      return;
    }

    this.isLoadingModal = true;

    const body: ILaboratorySubcategory = {
      id: this.selectedSubCategoryLaboratory?.id,
      fk_category: this.selectedLaboratory.id,
      name: String(this.subcategoryForm.value.name),
      ejemplo: String(this.subcategoryForm.value.ejemplo),
      valor: String(this.subcategoryForm.value.valor)
    }

    try {
      await this.adminService.laboratorySubCategory(body)
      this.resultSave = true
      this.isLoading = true
      this.isLoadingModal = false
      this.ngOnInit()
      this.modalSubCategoryClose.nativeElement.click();

    } catch (error) {
      console.log('error', error);
      this.isLoadingModal = false
    }


  }

  async removeSubcategory(id: number) {
    try {
      await this.adminService.removeLaboratorySubcategory(id)
      this.isLoading = true
      this.ngOnInit()
    } catch (error) {
      console.log('error', error);
    }
  }

  async getLaboratories() {
    this.laboratory = await this.adminService.getLaboratories();
  }

  filter(value: any) {
    if (value.target.value.length <= 1) {
      this.laboratory = this.laboratoryClone
      return
    }

    const filters = this.laboratoryClone.filter((x: ILaboratory) => x.name.toString().toLowerCase().includes(value.target.value.toLowerCase()))
    this.laboratory = filters
  }

}