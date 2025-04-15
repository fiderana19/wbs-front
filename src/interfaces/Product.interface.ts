export interface CreateProductInterface {
    libelle: string;
    description: string;
    pu: number;
    stock: number;
}

export interface Product {
    _id: string;
    libelle: string;
    description: string;
    pu: number;
    stock: number;
}

export interface ProductForDetail {
    _id: string;
    libelle: string;
}