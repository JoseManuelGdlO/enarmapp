import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { EAcountStatus } from "src/app/shared/interfaces/account-status.enum";
import { ISubscription } from "src/app/shared/interfaces/subscriptions.interface";
import { IUserType } from "src/app/shared/interfaces/user-type.interface";
import { AdminService } from "../../services/admin.service";

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: any;
  usersClone: any;
  userType!: Array<IUserType>
  subscriptions!: Array<ISubscription>;
  isLoadingModal = false

  selectedUser: any;
  error = false
  resultSave = false
  resetPassword = false
  loadingPassword = false

  responsePassword: any

  isLoading = true
  @ViewChild('myModalClose') modalClose!: any;

  profileForm = new FormGroup({
    apellidos: new FormControl(''),
    cumpleanos: new FormControl(''),
    email: new FormControl({ value: '', disabled: true }),
    estatus: new FormControl(0),
    idSuscripcion: new FormControl(0),
    idTipoUsuario: new FormControl(0),
    nombres: new FormControl(''),
  });



  constructor(
    private adminService: AdminService,
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.getUsers()
    await this.getUserTypes()
    await this.getSusbcriptions()

    for (const user of this.users.data) {
      const type = this.userType.find(x => x.id === user.idTipoUsuario)
      user.tipo = type?.tipo
      let estatusString = ''
      switch (user.estatus) {
        case EAcountStatus.CURRENT:
          estatusString = 'Corriente'
          break;
        case EAcountStatus.EXPIRE:
          estatusString = 'Vencido'
          break;
        case EAcountStatus.NEW:
          estatusString = 'Nuevo'
          break;
        case EAcountStatus.TRY:
          estatusString = 'Prueba'
          break;
        case EAcountStatus.DELETE:
          estatusString = 'Eliminado'
          break;
        default:
          estatusString = 'Desconocido'
      }

      const subscriptionString = this.subscriptions.find(x => x.id === user.idSuscripcion)?.descripcion

      user.suscripcion = subscriptionString ? subscriptionString : 'Desconocido'
      user.estatusString = estatusString
    }

    this.usersClone = [...this.users.data]
    this.isLoading = false

  }

  setValuesForm(user: any) {
    this.selectedUser = user;
    this.profileForm.patchValue({
      apellidos: user.apellidos,
      cumpleanos: user.cumpleanos,
      email: user.email,
      estatus: user.estatus,
      idSuscripcion: user.idSuscripcion,
      idTipoUsuario: user.idTipoUsuario,
      nombres: user.nombres
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
      apellidos: this.profileForm.value.apellidos,
      cumpleanos: this.profileForm.value.cumpleanos,
      email: this.profileForm.value.email,
      estatus: this.profileForm.value.estatus === this.selectedUser.estatus ? null : this.profileForm.value.estatus,
      idSuscripcion: this.profileForm.value.idSuscripcion,
      idTipoUsuario: this.profileForm.value.idTipoUsuario,
      nombres: this.profileForm.value.nombres,
    }
    try {
      await this.adminService.updateUser(body)
      this.resultSave = true
      this.isLoading = true
      this.isLoadingModal = false
      this.ngOnInit()
      this.modalClose.nativeElement.click();
      this.resetPassword = false

    } catch (error) {
      console.log('error', error);
      this.isLoadingModal = false
    }


  }


  async getUsers() {
    this.users = await this.adminService.getUsers();

  }

  async getUserTypes() {
    this.userType = await this.adminService.getUserTypes();

  }

  async getSusbcriptions() {
    this.subscriptions = await this.adminService.getSusbcriptions();

  }

  filter(value: any) {
    if (value.target.value.length <= 3) {
      this.users.data = this.usersClone
      return
    }

    const filters = this.usersClone.filter((x: any) => x.nombres.toLowerCase().includes(value.target.value.toLowerCase()) ||
      x.apellidos.toLowerCase().includes(value.target.value.toLowerCase()) ||
      x.email.toLowerCase().includes(value.target.value.toLowerCase()) ||
      x.tipo.toLowerCase().includes(value.target.value.toLowerCase()) ||
      x.suscripcion.toLowerCase().includes(value.target.value.toLowerCase()) |
      x.estatusString.toLowerCase().includes(value.target.value.toLowerCase()))
    this.users.data = filters
  }

  async resetPasswordFunc() {
    this.loadingPassword = true
    try {
      this.responsePassword = await this.adminService.resetPassword(this.selectedUser.id)
      this.loadingPassword = false
    } catch (error) {
      console.log('error', error);
      this.loadingPassword = false
    }
  }


}