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

  export function getFakeCommentPaginatedProxy(): CommentProxy{
    return {
      
        id: 1,
        message: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, ',
        createdAt: new Date().toISOString(),
        personName: 'Alice Smith',
        personColor: '#ff565e',
        personEmoji: '🐄',
        categoryId: 2,
        category: {
          name: 'Typescript',
          color: '#ffc542',      
          id: 2
        }
      };
}