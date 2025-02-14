import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import { ICategory, ISubcategory } from "app/shared/interfaces/categories.interface";
import { ETypeSelection } from "app/shared/interfaces/type-selection.enum";

@Component({
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    TYPE_SELECTION = ETypeSelection;

    selection = ETypeSelection.ADD


    isLoadingModal = false

    selectedCategory!: any;
    error = false
    resultSave = false

    responsePassword: any

    isLoading = true
    @ViewChild('myModalClose') modalClose!: any;

    categorieForm = new FormGroup({
        Nombre: new FormControl(''),
        subCategoria: new FormControl('')
    });


    categories!: Array<ICategory>;
    categoriesClone!: Array<ICategory>;


    constructor(
        private adminService: AdminService,
    ) {

    }

    async ngOnInit(): Promise<void> {
        await this.getCategories()

        this.categoriesClone = [...this.categories]
        this.isLoading = false

    }

    setValuesForm(sub?: any) {
        this.selectedCategory = sub;
        debugger
        if (!sub) {
            this.categorieForm.reset()
            return
        }
        this.categorieForm.patchValue({
            subCategoria: sub?.Nombre
        });
    }


    async addCategory() {
        if (this.isLoadingModal) return;

        if (this.categorieForm.value.Nombre === '' ||
            this.categorieForm.value.subCategoria === '' ||
            this.categorieForm.value.Nombre === null ||
            this.categorieForm.value.subCategoria === null) {
            this.error = true
            return;
        }

        this.isLoadingModal = true;
        const body = [{
            category: this.categorieForm.value.Nombre,
            subcategories: [this.categorieForm.value.subCategoria]
        }]
        try {
            await this.adminService.addCategory(body)
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

    async chooseSubcategory(type: ETypeSelection) {
        if(type === ETypeSelection.EDIT) {
            this.editSubcategory()
        } else {
            this.addSubcategory()
        }
    }

    async editSubcategory() {
        if (this.isLoadingModal) return;

        if (this.categorieForm.value.subCategoria === '' ||
            this.categorieForm.value.subCategoria === null) {
            this.error = true
            return;
        }

        this.isLoadingModal = true;
        const body = {
            id: this.selectedCategory?.id,
            name: this.categorieForm.value.subCategoria
        }

        try {
            await this.adminService.editSubCategory(body)
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

    async addSubcategory() {
        if (this.isLoadingModal) return;

        if (this.categorieForm.value.subCategoria === '' ||
            this.categorieForm.value.subCategoria === null) {
            this.error = true
            return;
        }

        this.isLoadingModal = true;
        const body = {
            fk_id: this.selectedCategory?.id,
            name: this.categorieForm.value.subCategoria
        }

        try {
            await this.adminService.addSubCategory(body)
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

    async getCategories() {
        this.categories = await this.adminService.getCategories();        
    }

    filter(value: any) {
        if (value.target.value.length <= 1) {
            this.categories = this.categoriesClone
            return
        }

        const filters = this.categoriesClone.filter((x: ICategory) => x.name.toString().toLowerCase().includes(value.target.value.toLowerCase()))
        this.categories = filters
    }

}