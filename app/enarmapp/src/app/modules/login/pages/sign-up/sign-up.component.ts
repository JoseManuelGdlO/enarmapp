import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
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
    especialities: any = []
    studentTypes = [
      { value: 'Estudiante' , id: 1},
      { value: 'Médico Interno de Pregrado' , id: 2},
      { value: 'Médico Pasante de Servicio Social' , id: 3},
      { value: 'Médico General' , id: 4},
    ];

    constructor(
      private formBuilder: FormBuilder,
      private loginService: LoginService
    ){}

    async ngOnInit() {
      this.getCatalogues();
      this.screenHeight = window.innerHeight;
    }

    async getCatalogues() {
      this.universidades = await this.loginService.getUnivercities()
      this.especialities = await this.loginService.getEspecialities()

      this.especialities.forEach((item: any) => {
        item.value = item.nombre;
      })

      this.universidades.forEach((item: any) => {
        item.value = item.nombre;
      })
      
    }

    onSubmit() {
      console.log('valido.- ',this.checkoutForm.valid);
      
    }
  }