export interface ICategory {
    id: number;
    name: string;
    subcategories: Array<ISubcategory>;
}

export interface ISubcategory {
    id: number;
    name: string;
    category_id: number;
    value?: string;
}