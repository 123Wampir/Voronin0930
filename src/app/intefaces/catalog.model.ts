export interface Product {
    name: string;
    article: string;
    price: number;
    manufacturer?: string,
    category: number,
    weight: number,
    count: number
    id?: number
}

export interface Category {
    id: number,
    name: string
}