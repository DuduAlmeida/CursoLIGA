import { CategoryProxy } from './../../models/proxies/category.proxy';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageAsyncResult } from 'src/app/models/interfaces/storage-async-result.interface';
import { CreateCategoryPayload } from 'src/app/models/payloads/create-category.payload';
import { PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category.proxy';
import { PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';
import { environment } from 'src/environments/environment';
import { getAllCommentsPaginatedByIdMockup } from '../comment/comment.mockup';
import { createCategoryMockup, getCategoriesPaginatedMockup } from './category.mockup';


/*** 
 * A classe que representa o interactor que lida com os comentários da aplicação
 */
@Injectable({
    providedIn: 'root'
})
export class CategoryInteractor {

    constructor(
        private readonly http: HttpClient,
    ) { }

    /* #region Http methods*/

    /*** 
     * Método que retorna as categorias
     */
    public async getCategoriesPaginated(currentPage: number, maxItens: number): Promise<StorageAsyncResult<PaginatedCategoryProxy>> {

        if (environment.mockupEnabled)
            return await getCategoriesPaginatedMockup(currentPage, maxItens);

        const url = environment.api.category.listPaginated
            .replace('{currentPage}', currentPage.toString())
            .replace('{maxItens}', maxItens.toString());

        return await this.http.get<PaginatedCategoryProxy>(url)
            .toPromise()
            .then(success => ({ success, error: undefined }))
            .catch((error) => ({ success: undefined, error }));
    }

    /*** 
     * Método que retorna todas os comentários referente a uma categoria
     * 
     * @param categoryId O id da categoria a buscar os comentários
     * @param currentPage A página ativa
     * @param maxItens A quantidade de intens que deve vir por paginação
     */
    public async getCommentsByCategory(categoryId: number, currentPage: number, maxItens: number): Promise<StorageAsyncResult<PaginatedCommentProxy>> {

        if (environment.mockupEnabled)
            return await getAllCommentsPaginatedByIdMockup(categoryId, currentPage, maxItens);

        const url = environment.api.comment.listPaginatedById
            .replace('{categoryId}', categoryId.toString())
            .replace('{currentPage}', currentPage.toString())
            .replace('{maxItens}', maxItens.toString());

        return await this.http.get<PaginatedCommentProxy>(url)
            .toPromise()
            .then(success => ({ success, error: undefined }))
            .catch((error) => ({ success: undefined, error }));
    }

    /*** 
     * Método que cria uma nova categoria
     * 
     * @param payload As informaçõs para a criação da categoria
     */
    public async createCategory(payload: CreateCategoryPayload): Promise<StorageAsyncResult<CategoryProxy>> {
        if (environment.mockupEnabled)
            return await createCategoryMockup(payload);

        const url = environment.api.category.create;

        return await this.http.post<CategoryProxy>(url, payload)
            .toPromise()
            .then(success => ({ success, error: undefined }))
            .catch((error) => ({ success: undefined, error }));
    }

    /* #Endregion Http methods*/
}
