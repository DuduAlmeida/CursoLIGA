import { CategoryProxy } from './../../models/proxies/category.proxy';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bird-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {}


  /* #region Inputs*/
  
  @Input()
  public content: CategoryProxy;
  
  /* #Endregion Inputs*/
}
