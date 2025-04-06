export interface CreateProductInterface {
    libelle: string;
    description: string;
    pu: string;
    stock: string;
}

export interface Product {
    _id: string;
    libelle: string;
    description: string;
    pu: string;
    stock: string;
}

export interface ProductForDetail {
    _id: string;
    libelle: string;
}