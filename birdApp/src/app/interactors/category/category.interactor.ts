import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageAsyncResult } from 'src/app/models/interfaces/storage-async-result.interface';
import { PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category.proxy';
import { environment } from 'src/environments/environment';
import { getCategoriesPaginatedMockup } from './category.mockup';


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

    /* #Endregion Http methods*/
}
