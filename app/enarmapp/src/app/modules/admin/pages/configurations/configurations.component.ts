import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { EAcountStatus } from "app/shared/interfaces/account-status.enum";
import { IConfiguration } from "app/shared/interfaces/configurations.interface";
import { ISubscription } from "app/shared/interfaces/subscriptions.interface";
import { IUserType } from "app/shared/interfaces/user-type.interface";
import { AdminService } from "../../services/admin.service";

@Component({
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  userType!: Array<IUserType>
  subscriptions!: Array<ISubscription>;
  isLoadingModal = false

  selectedUser!: IConfiguration;
  error = false
  resultSave = false

  responsePassword: any

  configurations!: Array<IConfiguration>
  configurationsClone!: Array<IConfiguration>

  isLoading = true
  @ViewChild('myModalClose') modalClose!: any;

  profileForm = new FormGroup({
    codigo: new FormControl(''),
    descripcion: new FormControl(''),
    grupo: new FormControl(''),
    tipo: new FormControl(''),
    valor: new FormControl('')
  });



  constructor(
    private adminService: AdminService,
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.getConfigurations()

    this.configurationsClone = [...this.configurations]
    this.isLoading = false

  }

  setValuesForm(confi?: IConfiguration) {
    this.selectedUser = confi ? confi : {} as IConfiguration;  
    if (!confi) {
      this.profileForm.reset()
      return
    }
    this.profileForm.patchValue({
      codigo: confi.codigo,
      descripcion: confi.descripcion,
      grupo: confi.grupo,
      tipo: confi.tipo,
      valor: confi.valor
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
      id: this.selectedUser.id,
      codigo: this.profileForm.value.codigo,
      descripcion: this.profileForm.value.descripcion,
      grupo: this.profileForm.value.grupo,
      tipo: this.profileForm.value.tipo,
      valor: this.profileForm.value.valor,
    }
    try {
      await this.adminService.updateConfigurations(body)
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


  async getConfigurations(){
    this.configurations = await this.adminService.getAllConfigurations();
  }


  filter(value: any) {
    if (value.target.value.length <= 3) {
      this.configurations = this.configurationsClone
      return
    }

    const filters = this.configurationsClone.filter((x: IConfiguration) => x.codigo.toLowerCase().includes(value.target.value.toLowerCase()) ||
      x.grupo.toLowerCase().includes(value.target.value.toLowerCase()) ||
      x.tipo.toLowerCase().includes(value.target.value.toLowerCase()) ||
      x.tipo.toLowerCase().includes(value.target.value.toLowerCase()) ||
      x.descripcion.toLowerCase().includes(value.target.value.toLowerCase()) ||
      x.valor.toLowerCase().includes(value.target.value.toLowerCase()))
    this.configurations = filters
  }




}