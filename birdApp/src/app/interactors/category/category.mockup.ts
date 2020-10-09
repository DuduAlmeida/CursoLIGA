import { StorageAsyncResult } from 'src/app/models/interfaces/storage-async-result.interface';
import { getFakeCategoryPaginatedProxy, PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category.proxy';




/*** 
 * Método que retorna as categorias
 */
export async function getCategoriesPaginatedMockup(currentPage: number, maxItens: number): Promise<StorageAsyncResult<PaginatedCategoryProxy>> {

    let paginatedCategory: PaginatedCategoryProxy = getFakeCategoryPaginatedProxy(),
    
        minIndex = (currentPage - 1) * maxItens,
        maxIndex = currentPage * maxItens,
        items =0;

    // debugger;

    paginatedCategory.items.map((category, index) => {
        category.id = index;
        category.name += index;
        items++;
    });

    paginatedCategory.items = paginatedCategory.items
    .filter((transformedCategory, index) => {
        return minIndex <= index && index < maxIndex;
    });

    paginatedCategory.pageCount = items/ maxItens;
    paginatedCategory.currentPage = currentPage;
    paginatedCategory.maxItens = maxItens;

    return Promise.resolve({
        error: undefined,
        success: paginatedCategory
    });
}