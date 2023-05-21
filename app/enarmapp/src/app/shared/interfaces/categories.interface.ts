export interface ICategory {
    id: number;
    name: string;
    subcategoria: Array<ISubcategory>;
}

export interface ISubcategory {
    Nombre: string;
    categoria: string;
    fkid_categoria: number;
    id: number;
    value?: string;
}