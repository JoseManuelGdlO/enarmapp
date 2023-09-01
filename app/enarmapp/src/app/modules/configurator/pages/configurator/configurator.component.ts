import { NumberSymbol } from "@angular/common";
import { Component, EventEmitter, OnInit } from "@angular/core";
import { IConfigExam, ISubtemas } from "src/app/shared/interfaces/config-exam.interface";
import { ConfiguratorService } from "../../services/configurator.service";
import { ICheckBoxOptions } from "src/app/shared/interfaces/checkbox-options.interface";
import { IRadioButtonOptions } from "src/app/shared/interfaces/radio-button.interface";
import { HomeService } from "src/app/modules/home/services/home.service";
import { PreferencesService } from "src/app/shared/services/preferences.service";


@Component({
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {

  error = false;
  configExam: IConfigExam = {};
  subtemas!: ISubtemas;
  filtro_preguntas: string[] = [];
  subtemasArray: string[] = [];
  idioma!: string;
  numero_preguntas!: number;
  simular_enarm!: boolean;
  modo_examen!: string;
  subcategorySelected!: ISubtemas;

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
    { value: 'Español', id: 11, selected: false },
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
    public preferencesService: PreferencesService
  ) { }

  async ngOnInit() {
    this.getCategoriesData();
    this.getExamDate();
    this.userId = this.preferencesService.getItem('USER').data.id;
    
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
    console.log(this.configExam);
    this.createExam()
  }

  async createExam() {
    try {
      const response = await this.configuratorService.addExam(this.configExam);
      console.log(response);
    } catch (error) {
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
    this.modo_examen = valor;
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