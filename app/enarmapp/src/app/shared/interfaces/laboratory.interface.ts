export interface ILaboratory {
    id: number;
    name: string;
    subcategories: Array<ILaboratorySubcategory>;
}

export interface ILaboratorySubcategory {
    id?: number;
    fk_category?: number;
    name: string;
    ejemplo?: string;
    valor?: string;
}