import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PreferencesService } from "src/app/shared/services/preferences.service";
import { LoginService } from "../../services/login.service";

@Component({
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
  })
  export class SignUpComponent implements OnInit {

    screenHeight = 0;
    checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      secondlastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      studenttype: ['', Validators.required],
      studies: ['', Validators.required],
      especility: ['', Validators.required],
      enarmdate: ['', Validators.required],
      email: ['', Validators.email],
      phonenumber: ['', Validators.required],
      password: ['', Validators.required],
      repypassword: ['', Validators.required]
    });
    
    universidades = []
    especialities = []
    studentTypes = [];
    enarmDate = [];

    user: any;
    fromSocialMedia = false;

    message = '';
    passwordInfo = false;
    isLoading = false;

    constructor(
      private formBuilder: FormBuilder,
      private loginService: LoginService,
      private preferencesServices: PreferencesService,
      private router: Router
    ){}

    async ngOnInit() {
      this.getCatalogues();
      this.getInfo()
      this.screenHeight = window.innerHeight;
    }

    getInfo() {
      this.user = this.preferencesServices.getItem('USER_MEDIA');
      if(this.user) {
        this.fromSocialMedia = true;
        this.checkoutForm.controls.name.setValue(this.user.firstName)
        this.checkoutForm.controls.email.setValue(this.user.email)
        this.checkoutForm.controls.password.clearValidators()
        this.checkoutForm.controls.repypassword.clearValidators()
      }
    }

    async getCatalogues() {
      this.universidades = await this.loginService.getUnivercities()
      this.especialities = await this.loginService.getEspecialities()
      this.studentTypes = await this.loginService.getStudentsTypes()
      this.enarmDate = await this.loginService.getEnarmDates()

      this.especialities.forEach((item: any) => {
        item.value = item.nombre;
      })

      this.universidades.forEach((item: any) => {
        item.value = item.nombre;
      })

      this.studentTypes.forEach((item: any) => {
        item.value = item.tipo;
      })

      this.enarmDate.forEach((item: any) => {
        item.value = item.fecha_anio;
      })
    }

    async onSubmit() {
      this.message = ''
      const idTipo: any = this.checkoutForm.controls.studenttype.value;
      const idUniversidad: any = this.checkoutForm.controls.studies.value;
      const idFechaEnarm: any = this.checkoutForm.controls.enarmdate.value;
      const idEspecialidad: any = this.checkoutForm.controls.especility.value;
      const object = {
        nombres: this.checkoutForm.controls.name.value,
        apellidos: this.checkoutForm.controls.lastname.value + ' ' + this.checkoutForm.controls.secondlastname.value,
        cumpleanos: this.checkoutForm.controls.birthdate.value,
        idsuscripcion: 0,
        email: this.checkoutForm.controls.email.value,
        password: this.checkoutForm.controls.password.value,
        replyPassword: this.checkoutForm.controls.repypassword.value,
        ruta_fotografia: '',
        idTipoUsuario: idTipo.id,
        idUniversidad: idUniversidad.id,
        idFechaEnarm: idFechaEnarm.id,
        idEspecialidad: idEspecialidad.id,
        sexo: 'Masculino',
        id_social_media: this.user.id ? this.user.id : null
      }

      const passw=  /^[A-Za-z]\w{7,14}$/;
      if(!this.fromSocialMedia && !object.password?.match(passw)) 
      { 
        this.message = 'La contraseña no cumple con los requisitos';
        return;
      }

      if(!this.fromSocialMedia && object.password !== object.replyPassword) {
        this.message = 'Las contraseñas no coinciden';
        return;
      }
      
      this.isLoading = true;
      try {
        await this.loginService.register(object);
        let response;
        if(this.user){
          response = await this.loginService.loginForId(String(object.email), this.user.id)
        }else {
          response = await this.loginService.login(String(object.email), object.password ? object.password : '')
        }

        this.preferencesServices.setItem('AUTH_TOKEN', response.token)
        this.preferencesServices.setItem('USER', response.data);
        this.isLoading = false
        this.router.navigateByUrl('home')
        
      } catch (error) {
        console.error(error);
        this.isLoading = false
      }
    }
  }