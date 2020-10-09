import { HttpClientModule } from '@angular/common/http';
import { CategoryItemModule } from './../../../components/category-item/category-item.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    CategoryItemModule,
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
