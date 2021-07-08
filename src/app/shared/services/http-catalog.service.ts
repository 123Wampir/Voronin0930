import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Product } from 'src/app/intefaces/catalog.model';

@Injectable({
  providedIn: 'root'
})
export class HttpCatalogService {

  constructor(private http:HttpClient) { }
  source="http://localhost:3000";

  getProducts(): Promise<Product[]>{
    return this.http.get<Product[]>(`${this.source}/product`).toPromise();
  }
  getProduct(id:number): Promise<Product>{
    return this.http.get<Product>(`${this.source}/product/${id}`).toPromise();
  }
  postProduct(item:Product): Promise<Product>{
    return this.http.post<Product>(`${this.source}/product/`,item).toPromise();
  }
  putProduct(id:number,item:Product): Promise<Product>{
    return this.http.put<Product>(`${this.source}/product/${id}`,item).toPromise();
  }
  deleteProduct(id:number): Promise<Product>{
    return this.http.delete<Product>(`${this.source}/product/${id}`).toPromise();
  }
  getCategories(): Promise<Category[]>{
    return this.http.get<Category[]>(`${this.source}/category`).toPromise();
  }
  getCategory(id:number): Promise<Category>{
    return this.http.get<Category>(`${this.source}/category/${id}`).toPromise();
  }
  postCategory(item:Category): Promise<Category>{
    return this.http.post<Category>(`${this.source}/category/`,item).toPromise();
  }
  putCategory(id:number,item:Category): Promise<Category>{
    return this.http.put<Category>(`${this.source}/category/${id}`,item).toPromise();
  }
  deleteCategory(id:number): Promise<Category>{
    return this.http.delete<Category>(`${this.source}/category/${id}`).toPromise();
  }
}
