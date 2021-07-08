import { Injectable } from '@angular/core';
import { Category, Product } from 'src/app/intefaces/catalog.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor() { }
  products:Product[]=[];
  categories:Category[]=[];
}
