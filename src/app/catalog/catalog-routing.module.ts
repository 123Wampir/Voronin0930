import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogItemComponent } from './pages/catalog-item/catalog-item.component';
import { CatalogListComponent } from './pages/catalog-list/catalog-list.component';
import { CatalogLayoutComponent } from './shared/catalog-layout/catalog-layout.component';


const routes: Routes = [
  {
    path:"",
    component:CatalogLayoutComponent,
    children:[
      {
        path:"",
        component:CatalogListComponent
      },
      {
        path:"item",
        component:CatalogItemComponent
      },
      {
        path:"item/:id",
        component:CatalogItemComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
