import { getFakeCommentProxy } from 'src/app/models/proxies/comment.proxy';
import { CommentProxy } from './comment.proxy';

/*** 
 * Proxy que recebe os comentários e efetua a paginação
 */
export interface PaginatedCommentProxy {
  /**
   * O indice atual da paginação
   */
  currentPage: number;

  /**
   * O total de paǵinas dessa paginação
   */
  pageCount: number;

  /**
   * O total de itens por página
   */
  maxItens: number;

  /**
   * Os itens dessa páginação
   */
  items: CommentProxy[];
}

export function getFakeCommentPaginatedProxy(): PaginatedCommentProxy {
  let paginatedComment: PaginatedCommentProxy = {
    currentPage: 1,
    pageCount: 1,
    maxItens: 15,
    items: [
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
      getFakeCommentProxy(),
    ]
  };
  
  return paginatedComment;
}

export function getEmptyCommentPaginatedProxy(): PaginatedCommentProxy{
  let paginatedComment: PaginatedCommentProxy = {
    currentPage: 0,
    pageCount: 0,
    maxItens: 0,
    items: []
  };

  return paginatedComment;
}