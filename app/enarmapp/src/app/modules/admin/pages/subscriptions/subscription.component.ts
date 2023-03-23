import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { EAcountStatus } from "src/app/shared/interfaces/account-status.enum";
import { ISubscription } from "src/app/shared/interfaces/subscriptions.interface";
import { IUserType } from "src/app/shared/interfaces/user-type.interface";
import { AdminService } from "../../services/admin.service";

@Component({
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {


  subscriptions!: Array<ISubscription>;

  subscriptionsClone!: Array<ISubscription>;
  isLoadingModal = false

  selectedSubs: any;
  error = false
  resultSave = false

  responsePassword: any

  isLoading = true
  @ViewChild('myModalClose') modalClose!: any;

  profileForm = new FormGroup({
    costo: new FormControl(0),
    descripcion: new FormControl(''),
    duracionMes: new FormControl(0),
    tipo: new FormControl(''),
  });



  constructor(
    private adminService: AdminService,
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.getSusbcriptions()

    this.subscriptionsClone = [...this.subscriptions]
    this.isLoading = false

  }

  setValuesForm(sub?: ISubscription) {
    this.selectedSubs = sub;
    if(!sub) {
      this.profileForm.reset()
      return
    }
    this.profileForm.patchValue({
      costo: sub?.costo,
      descripcion: sub?.descripcion,
      duracionMes: sub?.duracionMes,
      tipo: sub?.tipo,
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
      id: this.selectedSubs?.id,
      costo: this.profileForm.value.costo,
      descripcion: this.profileForm.value.descripcion,
      duracionMes: this.profileForm.value.duracionMes,
      tipo: this.profileForm.value.tipo,
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

  async getSusbcriptions() {
    this.subscriptions = await this.adminService.getSusbcriptions();
  }

  filter(value: any) {
    if (value.target.value.length <= 1) {
      this.subscriptions = this.subscriptionsClone
      return
    }

    const filters = this.subscriptionsClone.filter((x: ISubscription) => x.costo.toString().toLowerCase().includes(value.target.value.toLowerCase()) ||
      x.descripcion.toLowerCase().includes(value.target.value.toLowerCase()) ||
      x.duracionMes.toString().toLowerCase().includes(value.target.value.toLowerCase()) ||
      x.tipo.toLowerCase().includes(value.target.value.toLowerCase()))
    this.subscriptions = filters
  }

}