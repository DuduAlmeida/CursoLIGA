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