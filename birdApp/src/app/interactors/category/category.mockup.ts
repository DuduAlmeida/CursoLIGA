import { StorageAsyncResult } from 'src/app/models/interfaces/storage-async-result.interface';
import { CreateCategoryPayload } from 'src/app/models/payloads/create-category.payload';
import { CategoryProxy, getFakeCategoryProxy } from 'src/app/models/proxies/category.proxy';
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
        category.id = index+1;
        category.name += index+1;
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

export async function createCategoryMockup(payload: CreateCategoryPayload): Promise<StorageAsyncResult<CategoryProxy>>{

    await new Promise( resolve =>{
        setTimeout(resolve, 2000);
    });

    return Promise.resolve({
        success: getFakeCategoryProxy(),
        error: undefined
    });
}