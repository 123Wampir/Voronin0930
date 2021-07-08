import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product } from 'src/app/intefaces/catalog.model';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { HttpCatalogService } from 'src/app/shared/services/http-catalog.service';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css']
})
export class CatalogListComponent implements OnInit {

  filters = [{ id: 0, selector: "category" }, { id: 0, selector: "count" }];
  products: Product[] = [];
  categories: Category[] = [];
  count = [{ id: 0, name: "КОЛ. НА СКЛАДЕ" }, { id: 1, name: "Есть на складе" }, { id: 2, name: "Нет на складе" }];
  constructor(
    private HttpCatalogService: HttpCatalogService,
    public CatalogService: CatalogService,
    private router: Router
  ) { }

  async getData() {
    this.CatalogService.categories = await this.HttpCatalogService.getCategories();
    this.categories = this.CatalogService.categories;
    this.categories.unshift({ name: "КАТЕГОРИЯ", id: 0 });
    this.CatalogService.products = await this.HttpCatalogService.getProducts();
    this.products = this.CatalogService.products;
  }
  ngOnInit(): void {
    this.getData();
    console.log(this.CatalogService)
  }

  linkToItem(id?: number) {
    if (id) {
      this.router.navigate([this.router.url, "item", id]);
    }
    else this.router.navigate([this.router.url, "item"])
  }
  async onProductDelete(id: number | undefined) {
    if (id)
      try {
        await this.HttpCatalogService.deleteProduct(id);
        this.getData();
      } catch (err) { console.log(err) };
  }
  getCategoryLabel(id: number) {
    return this.CatalogService.categories.find(item => item.id == id)?.name;
  }
  changeCount(item: Product, add: boolean) {
    if (add) {
      item.count++;
        this.HttpCatalogService.putProduct(item.id!, item)
    }
    else{
      item.count--;
        this.HttpCatalogService.putProduct(item.id!, item)
    }
  }
  filter(filterId: string, selector: string) {
    this.products = this.CatalogService.products;
    let id = 0;
    if (filterId)
      id = parseInt(filterId);
    this.filters.find(item => item.selector == selector ? item.id = id : false);
    console.log(this.filters);
    for (let fil of this.filters) {
      if (fil.id != 0) {
        if (fil.selector == "category") {
          this.products = this.products.filter(item => item.category == fil.id);
          console.log(this.products);
        }
        else if (fil.selector == "count") {
          this.products = this.products.filter(item => fil.id == 1 ? item.count > 0 : item.count == 0)
          console.log(this.products);
        }
      }
    }
  }
  sorting(sortId: string) {
    let id = parseInt(sortId);
    switch (id) {
      case 0:
        {
          this.products = this.products.sort((a, b) => a.price - b.price);
          break;
        }
      case 1:
        {
          this.products = this.products.sort((a, b) => b.price - a.price);
          break;
        }
      case 2:
        {
          this.products = this.products.sort((a, b) => a.count - b.count);
          break;
        }
      case 3:
        {
          this.products = this.products.sort((a, b) => b.count - a.count);
          break;
        }
    }
  }
}
