import { NumberSymbol } from "@angular/common";
import { Component, EventEmitter, OnInit } from "@angular/core";
import { IConfigExam, ISubtemas } from "app/shared/interfaces/config-exam.interface";
import { ConfiguratorService } from "../../services/configurator.service";
import { ICheckBoxOptions } from "app/shared/interfaces/checkbox-options.interface";
import { IRadioButtonOptions } from "app/shared/interfaces/radio-button.interface";
import { HomeService } from "app/modules/home/services/home.service";
import { PreferencesService } from "app/shared/services/preferences.service";
import { Router } from "@angular/router";


@Component({
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {

  error = false;
  configExam: IConfigExam = { idioma: 1, modo_examen: 1, simular_enarm: false };
  subtemas!: ISubtemas;
  filtro_preguntas: string[] = [];
  subtemasArray: string[] = [];
  idioma = 'Español'
  numero_preguntas!: number;
  simular_enarm = false;
  modo_examen = 1;
  subcategorySelected!: ISubtemas;
  errorResult = ''
  success = false

  isLoading = true;

  title = 'app';

  value: number = 20;
  userId = 0;

  slideStop() {
    console.log(this.value);
  }


  optionsCheckBox: ICheckBoxOptions[] = [
    { value: 'No contestadas', id: 1, selected: false },
    { value: 'Correctas', id: 1, selected: false },
    { value: 'Incorrectas', id: 1, selected: false }
  ]
  optionsRadioButtonLanguage: IRadioButtonOptions[] = [
    { value: 'Español', id: 11, selected: true },
    { value: 'Inglés', id: 10, selected: false }
  ]
  optionsRadioButtonMode: IRadioButtonOptions[] = [
    { value: 'Modo Estudio', id: 2, selected: false },
    { value: 'Modo Simulador', id: 2, selected: false }
  ]
  examDate = 0

  constructor(
    private configuratorService: ConfiguratorService,
    private homeService: HomeService,
    public router: Router,
    public preferencesService: PreferencesService
  ) { }

  async ngOnInit() {
    await this.getCategoriesData();
    await this.getExamDate();
    this.userId = this.preferencesService.getItem('USER').data.id;
    this.isLoading = false;
    
  }


  async getExamDate(): Promise<void> {
    try {
      const response = await this.homeService.getConfigs('EXAM_DATE')
      const date = new Date(response)
      const Difference_In_Time = date.getTime() - new Date().getTime();
      const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      this.examDate = Math.round(Difference_In_Days)
    } catch (error) {
      console.error(error);
    }

  }

  async getCategoriesData() {
    this.subtemas = await this.configuratorService.getCategories()
    this.subtemas.response.forEach((item: any) => {
      item.subcategoria.forEach((subitem: any) => {
        subitem.value = subitem.Nombre;
        subitem.index = subitem.id;
      })
      item.value = item.name;
      item.index = item.id;
    })
  }

  getAllValues() {
    this.configExam.subcategories = this.subtemasArray;
    this.configExam.question_filters = this.filtro_preguntas;
    this.configExam.idioma = this.idioma == 'Español' ? 1 : 0 ;
    this.configExam.numero_preguntas = this.numero_preguntas;
    this.configExam.simular_enarm = this.simular_enarm;
    this.configExam.modo_examen = this.modo_examen;
    this.configExam.idUsuario = this.userId
    // console.log(this.configExam);
    if (!this.configExam.numero_preguntas){
      this.errorResult = 'Debes seleccionar el número de preguntas'
      return
    }

    if(this.configExam.subcategories.length === 0){
      this.errorResult = 'Debes seleccionar al menos un filtro de preguntas'
      return
    }
    this.createExam()
  }

  async createExam() {
    try {
      this.isLoading = true;
      const response = await this.configuratorService.addExam(this.configExam);
      console.log(response);
      this.success = true;
      this.router.navigateByUrl('/exam/work/' + response.id);
    } catch (error: any) {
      this.isLoading = false;
      this.errorResult = error.statusText;
      console.log(error);
    }
  }


  selectCategory(value: any) {
    console.log(value);
    this.subcategorySelected = value.subcategoria;
  }

  getSubcatValue(args: string) {
    console.log("Recibo subcat value" + args)
    let arrelgo: string[] = [];
    args.split(/\s*,\s*/).forEach(function (myString) {
        console.log(myString);
        arrelgo.push(myString);
    });
    this.subtemasArray = arrelgo;
  }

  getFilterValue(args: ICheckBoxOptions) {
    console.log("Recibo checkbox value" + args.value + "\n" + args.selected);
    let valor: string = args.value;
    let seleccionado: boolean = args.selected;
    if (seleccionado === true) {
      this.filtro_preguntas.push(valor);
    } else {
      console.log("Eliminaré " + this.filtro_preguntas[this.filtro_preguntas.indexOf(valor)]);
      this.filtro_preguntas.splice(this.filtro_preguntas.indexOf(valor), 1)
    }
    console.log("The array is:" + this.filtro_preguntas);
  }

  getLanguageValue(args: IRadioButtonOptions) {
    console.log("Recibo radiobutton value" + args.value + "\n" + args.selected);
    let valor: string = args.value;
    this.idioma = valor;
    console.log(this.idioma);
  }

  getModeValue(args: IRadioButtonOptions) {
    console.log("Recibo radiobutton value" + args.value + "\n" + args.selected);
    let valor: string = args.value;
    this.modo_examen = valor === 'Modo Estudio' ? 1 : 2;
    console.log(this.modo_examen);
  }

  getSimulatorValue(args: boolean){
    console.log("Recibo del toggle: "+args);
    this.simular_enarm = args;
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  getSliderValue(args: any){
    console.log(args.value);
    this.numero_preguntas = args.value;
  }

}