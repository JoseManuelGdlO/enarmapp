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
  error = false
  resultSave = false

  responsePassword: any

  isLoading = true
  @ViewChild('myModalClose') modalClose!: any;

  profileForm = new FormGroup({
    ejemplo: new FormControl(''),
    name: new FormControl(''),
    valor: new FormControl(''),
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
      this.profileForm.reset()
      return
    }
    this.profileForm.patchValue({
      ejemplo: sub?.ejemplo,
      name: sub?.name,
      valor: sub?.valor,
    });
  }


  async onSubmit() {
    if (this.isLoadingModal) return;
    
    if (this.profileForm.invalid) {
      this.error = true
      return;
    }

    this.isLoadingModal = true;

    const body = {
      id: this.selectedLaboratory?.id,
      valor: this.profileForm.value.valor,
      name: this.profileForm.value.name,
      ejemplo: this.profileForm.value.ejemplo
    }
    try {
      await this.adminService.updateSubscription(body)
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