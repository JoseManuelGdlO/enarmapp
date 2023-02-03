import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'enarm-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent {  
    subcatList: any = ["Cardiología", "Nefrología", "Infectología", "Neumología"]
    
    //selected: string = '';

    @Input() value = ''
    @Input() items = [
      { value: 'Cardio', id: 1, selected: false},
      { value: 'Nefro', id: 1, selected: false},
      { value: 'Gastro', id: 1, selected: false},
      { value: 'Onco', id: 1, selected: false},
      { value: 'Hemato', id: 1, selected: false},
      { value: 'Infecto', id: 1, selected: false},
      { value: 'Neumo', id: 1, selected: false},
      { value: 'Reuma', id: 1, selected: false},
      { value: 'Endocrino', id: 1, selected: false},
      { value: 'Geria', id: 1, selected: false}]

      itemsFiltered = [...this.items];

    @Output() onSelected = new EventEmitter()
    isHidden = true
    @Input() placeholder = 'Seleccionar subtemas'
    /* eslint-disable no-useless-constructor */
    constructor () {
    }
    selected (item:any): void {
      item.selected = !item.selected
      if(item.selected == true){
        this.value = this.value.length === 0 ? item.value: item.value + ', ' + this.value
        const index = this.items.findIndex(x => x === item);
        this.items[index].selected = true;
      }else{
        const valueArray = this.value.split(', ')
        const indexItem = valueArray.findIndex(x => x === item.value)
        valueArray.splice(indexItem, 1)
        this.value = valueArray.join(', ')
      }
      //this.isHidden = true
      this.onSelected.emit(item)
  }  

  findItem(value: string) {
    this.itemsFiltered = this.items;
    if(value.length < 1) {
      return
    }
    this.itemsFiltered = this.items.filter(x => {
     const response = x.value.toLowerCase().includes(value.toLocaleLowerCase());
     return response
    });

  }

}


