import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-comments',
  templateUrl: './category-comments.page.html',
  styleUrls: ['./category-comments.page.scss'],
})
export class CategoryCommentsPage implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { 
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId')) | 0;

    if(this.categoryId === 0)
      return void this.router.navigateByUrl('/main/categories');

    console.log(this.categoryId);    
  }

  ngOnInit() {
  }


  /* #region Private Properties*/
  
  /*** 
   * A identificação da categoria
   */
  private readonly categoryId: number;
  
  /* #Endregion Private Properties*/
}
