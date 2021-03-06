import { Injectable } from '@angular/core';
import { CategoryInteractor } from 'src/app/interactors/category/category.interactor';
import { CreateCategoryPayload } from 'src/app/models/payloads/create-category.payload';
import { getEmptyCategoryPaginatedProxy, PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category.proxy';
import { getEmptyCommentPaginatedProxy, PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private readonly interactor: CategoryInteractor,
  ) { }

  /*** 
   * Método que retorna todas as categorias
   * 
   * @param currentPage A página ativa
   * @param maxItens A quantidade de intens que deve vir por paginação
   */
  public async getCategories(currentPage: number, maxItens: number): Promise<PaginatedCategoryProxy>{    
    const {error, success} = await this.interactor.getCategoriesPaginated(currentPage, maxItens);

    if(error)
      return getEmptyCategoryPaginatedProxy();

    return success;
  }

  /*** 
   * Método que retorna todas os comentários referente a uma categoria
   * 
   * @param categoryId O id da categoria a buscar os comentários
   * @param currentPage A página ativa
   * @param maxItens A quantidade de intens que deve vir por paginação
   */
  public async getCommentsByCategory(categoryId: number, currentPage: number, maxItens: number): Promise<PaginatedCommentProxy> { 
    const {error, success} = await this.interactor.getCommentsByCategory(categoryId, currentPage, maxItens);

    if(error)
      return getEmptyCommentPaginatedProxy();

    return success;
  }

  /*** 
   * Método que cria uma nova categoria
   * 
   * @param payload As informaçõs para a criação da categoria
   */
  public async createCategory(payload: CreateCategoryPayload): Promise<[boolean, string]>{
    const {error, success} = await this.interactor.createCategory(payload);    

    if(error)
    return [false, 'Ocorreu um erro ao criar, por favor, tente novamente'];

    return [true, 'Categoria criada com sucesso'];
  }
}
