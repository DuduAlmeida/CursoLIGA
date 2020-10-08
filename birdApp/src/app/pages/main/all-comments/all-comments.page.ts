import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
import { PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'bird-all-comments',
  templateUrl: './all-comments.page.html',
  styleUrls: ['./all-comments.page.scss'],
})
export class AllCommentsPage implements OnInit, OnDestroy {

  constructor(
    private readonly comment: CommentService
  ) {
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

  public trackById(index: number, value: CommentProxy): number {
    return value.id;
  }

  /*** 
   * Método que é executado toda vez que ocorre um evento de scroll no container dos itens
   * 
   * @param event as informações do evento do Scroll
   */
  public onScroll(event: any): void {
    this.currentScrollFrameSubject.next(event.currentTarget);
  }

  public async nextPage(): Promise<void> {
    if (this.paginatedComment?.currentPage >= this.paginatedComment?.pageCount)
      return;

    if (this.isLoadingComments)
      return;

    this.isLoadingComments = true;

    const currentPage = this.paginatedComment?.currentPage || 0;

    this.paginatedComment = await this.comment.getAllCommentsPaginated(currentPage + 1, 4);
    this.listComments = [...this.listComments, ...this.paginatedComment.items];

    this.isLoadingComments = false;
  }

  /* #Endregion Public Methods*/
}
