import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/intefaces/catalog.model';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { HttpCatalogService } from 'src/app/shared/services/http-catalog.service';


@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {

  productForm!: FormGroup;
  // typeForm!: FormGroup;
  id: null | number = null;
  product!: Product;

  constructor(
    private HttpCatalogService: HttpCatalogService,
    public CatalogService: CatalogService,
    private fb: FormBuilder,
    private router: Router,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params.id ? +params.id : null;
    })
    this.getCategory();
    this.getData();
    // console.log(this.typeForm.get('type')?.value);
  }

  async getCategory() {
    try {
      this.CatalogService.categories = await this.HttpCatalogService.getCategories();
    } catch (err) { console.error(err); }
  }
  async getData() {
    const productControls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      article: [null, [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.maxLength(15), Validators.min(0)]],
      manufacturer: [null, [Validators.maxLength(30)]],
      category: [null, [Validators.required]],
      weight: [null, [Validators.required, Validators.maxLength(100), Validators.min(0)]],
      count: [null, [Validators.required, Validators.maxLength(100), Validators.min(0)]]
    }
    this.productForm = this.fb.group(productControls);

    if (this.id) {
      try {
        this.product = await this.HttpCatalogService.getProduct(this.id);
      } catch (err) { console.log(err) }
      this.productForm.patchValue(this.product);
    }
    else this.productForm.reset();
  }
  async onSave() {
    const product = this.productForm.value;
    console.log(product);
    if (this.id) {
      try {
        await this.HttpCatalogService.putProduct(this.id, product);
        this.getData();
        alert("Data saved");
      } catch (err) { console.log(err) }
    }
    else try {
      const result = await this.HttpCatalogService.postProduct(product);
      this.router.navigate([this.router.url, result.id]);
    } catch (err) { console.log(err) }
  }
  clearData() {
    this.productForm.reset();
  }

}
