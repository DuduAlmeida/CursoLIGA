import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';
import { TrackablePage } from 'src/app/common/trackable.page';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
import { PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-comments',
  templateUrl: './category-comments.page.html',
  styleUrls: ['./category-comments.page.scss'],
})
export class CategoryCommentsPage extends TrackablePage implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly category: CategoryService,
  ) {
    super();

    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId')) | 0;

    if (this.categoryId === 0)
      return void this.router.navigateByUrl('/main/categories');

    console.log(this.categoryId);

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

  public listComments: CommentProxy[] = [];
  public paginatedComment: PaginatedCommentProxy;
  public isLoadingComments: boolean;
  /*** 
   * A identificação da categoria
   */
  public categoryId: number;

  /* #Endregion Public properties*/

  /* #region Life-Cycle Events*/

  public async ngOnInit() {

    await this.nextPage();
  }

  public ngOnDestroy(): void {
    this.currentScrollSubscription.unsubscribe();
  }

  /* #Endregion Life-Cycle Events*/

  /* #region Private Properties*/

  private readonly currentScrollSubscription: Subscription;

  private readonly currentScrollFrameSubject: Subject<HTMLDivElement> = new Subject<HTMLDivElement>();


  /* #Endregion Private Properties*/

  /* #region Public Methods*/

  /*** 
   * Método que é executado toda vez que ocorre um evento de scroll no container dos itens
   * 
   * @param event as informações do evento do Scroll
   */
  public onScroll(event: any): void {
    this.currentScrollFrameSubject.next(event.currentTarget);
  }

  /*** 
   * Método que faz o loading de mais conteúdos, caso tenha
   */
  public async nextPage(): Promise<void> {
    if (this.paginatedComment?.currentPage >= this.paginatedComment?.pageCount)
      return;

    if (this.isLoadingComments)
      return;

    this.isLoadingComments = true;

    const currentPage = this.paginatedComment?.currentPage || 0;

    this.paginatedComment = await this.category.getCommentsByCategory(this.categoryId, currentPage + 1, 4);
    this.listComments = [...this.listComments, ...this.paginatedComment.items];

    this.isLoadingComments = false;
  }

  /* #Endregion Public Methods*/
}
