import { CategoryProxy, getFakeCategoryProxy } from './category.proxy';


/*** 
 * Proxy que recebe as categorias e efetua a paginação
 */
export interface PaginatedCategoryProxy {
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
  items: CategoryProxy[];
}

export function getFakeCategoryPaginatedProxy(): PaginatedCategoryProxy {
  let paginatedComment: PaginatedCategoryProxy = {
    currentPage: 1,
    pageCount: 1,
    maxItens: 10,
    items: [
      getFakeCategoryProxy(),
      getFakeCategoryProxy(),
      getFakeCategoryProxy(),
      getFakeCategoryProxy(),
      getFakeCategoryProxy(),
      getFakeCategoryProxy(),
      getFakeCategoryProxy(),
      getFakeCategoryProxy(),
      getFakeCategoryProxy(),
      getFakeCategoryProxy()
    ]
  };
  
  return paginatedComment;
}

export function getEmptyCategoryPaginatedProxy(): PaginatedCategoryProxy{
  let paginatedComment: PaginatedCategoryProxy = {
    currentPage: 0,
    pageCount: 0,
    maxItens: 0,
    items: []
  };

  return paginatedComment;
}