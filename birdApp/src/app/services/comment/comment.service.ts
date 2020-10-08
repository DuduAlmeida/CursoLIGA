import { Injectable } from '@angular/core';
import { max } from 'rxjs/operators';
import { CommentInteractor } from 'src/app/interactors/comment.interactor';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
import { getEmptyCommentPaginatedProxy, PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';


/*** 
 * A classe que representa o serviço que lida com os comentários da aplicação
 */
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private readonly interactor: CommentInteractor,
  ) { }

  /* #region Public methods*/

  /*** 
   * Método que retorna os meus comentários criados
   */
  public async getMyComments(): Promise<CommentProxy[]> {
    const { success, error } = await this.interactor.getMyComments();

    if (error)
      return [];
    
    if(!Array.isArray(success))
      return [];

    return success;
  }

  public async getAllComments(): Promise<CommentProxy[]> {
    
    const { success, error } = await this.interactor.getAllComments();

    if (error)
      return [];
    
    if(!Array.isArray(success))
      return [];

    return success;
  }

  public async getAllCommentsPaginated(currentPage: number, maxItens: number): Promise<PaginatedCommentProxy> {
    
    const { success, error } = await this.interactor.getAllCommentsPaginated(currentPage, maxItens);

    if (error)
      return getEmptyCommentPaginatedProxy();
    
    if(!Array.isArray(success.items))
      return getEmptyCommentPaginatedProxy();

    return success;
  }

  /* #Endregion Public methods*/
}
