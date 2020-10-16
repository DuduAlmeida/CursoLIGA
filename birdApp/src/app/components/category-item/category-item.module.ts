import { IonicModule } from '@ionic/angular';
import { CategoryItemComponent } from './category-item.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        CategoryItemComponent
    ],
    declarations: [
        CategoryItemComponent
    ]
})
export class CategoryItemModule{}