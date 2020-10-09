import { TrackablePage } from './../../../common/trackable.page';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryProxy, getFakeCategoryProxy } from 'src/app/models/proxies/category.proxy';

import { Subject, Subscription } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';
import { PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category.proxy';
import { CategoryService } from 'src/app/services/category/category.service';


@Component({
  selector: 'bird-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage extends TrackablePage implements OnInit, OnDestroy {

  constructor(
    private readonly category: CategoryService
  ) {

    super();

    this.currentScrollSubscription = this.currentScrollFrameSubject.pipe(
      //Espera determinado milisegundos para emitir um evento
      throttleTime(16),
      map(currentDiv => {
        const threshsold = 100;
        const position = currentDiv.scrollTop + currentDiv.offsetHeight;
        const height = currentDiv.scrollHeight;

        return position > height - threshsold;
      })
    ).subscribe(isNearBottom => isNearBottom && this.nextPage())
  }


  /* #region Public properties*/

  
  /*** 
   * A lista de categorias
   */
  public listCategories: CategoryProxy[] = [];
  public paginatedCategory: PaginatedCategoryProxy;
  public isLoadingCategory: boolean;

  

  /* #Endregion Public properties*/

  /* #region Life-Cycle Events*/

  public async ngOnInit() {

    await this.nextPage();
  }

  public ngOnDestroy(): void {
    this.currentScrollSubscription.unsubscribe();
  }

  /* #Endregion Life-Cycle Events*/

  /* #region Private Events*/

  private readonly currentScrollSubscription: Subscription;

  private readonly currentScrollFrameSubject: Subject<HTMLDivElement> = new Subject<HTMLDivElement>();

  /* #Endregion Private Events*/

  /* #region Public Methods*/

  /*** 
   * Método que é executado toda vez que ocorre um evento de scroll no container dos itens
   * 
   * @param event as informações do evento do Scroll
   */
  public onScroll(event: any): void {
    this.currentScrollFrameSubject.next(event.currentTarget);
  }

  public async nextPage(): Promise<void> {    
    if (this.paginatedCategory?.currentPage >= this.paginatedCategory?.pageCount)
      return;

    if (this.isLoadingCategory)
      return;

    this.isLoadingCategory = true;

    const currentPage = this.paginatedCategory?.currentPage || 0;
    
    this.paginatedCategory = await this.category.getCategories(currentPage + 1, 4);
    this.listCategories = [...this.listCategories, ...this.paginatedCategory.items];

    this.isLoadingCategory = false;
  }

  /* #Endregion Public Methods*/
}
