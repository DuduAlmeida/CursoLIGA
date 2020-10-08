import { TrackablePage } from './../../../common/trackable.page';
import { Component, OnInit } from '@angular/core';
import { CategoryProxy, getFakeCategoryProxy } from 'src/app/models/proxies/category.proxy';

@Component({
  selector: 'bird-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage extends TrackablePage implements OnInit  {

  constructor() {
    super();
   }

  ngOnInit() {
  }


  /* #region Public properties*/
  
  /*** 
   * A lista de categorias
   */
  public listCategories: CategoryProxy[] = [
    getFakeCategoryProxy(),
    getFakeCategoryProxy(),
    getFakeCategoryProxy(),
    getFakeCategoryProxy()
  ];
  
  /* #Endregion Public properties*/
}
