import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'enarm-menu-category',
    templateUrl: './menu-category.component.html',
    styleUrls: ['./menu-category.component.scss']
})
export class MenuCategoryComponent {  
    @Input() set getCategories(value:any){
        this.category = value;
    }
    
    @Output() selectedCategory = new EventEmitter<any>()

    category = [
        {name: 'Medicina Interna', id: 2, selected : false},
        {name: 'Cirugía', id: 2, selected : false},
        {name: 'Pediatría', id: 2, selected : false},
        {name: 'Medicina Familiar', id: 2, selected : false},
        {name: 'Ginecología y Obstetricia', id: 2, selected : false}
    ]

    ngOnInit (): void {
        console.log('enter')
    }

    select(item:any){
        this.category.forEach((element:any) => {
            element.selected = false
        });
        item.selected = true
        this.selectedCategory.emit(item);
    }
}

