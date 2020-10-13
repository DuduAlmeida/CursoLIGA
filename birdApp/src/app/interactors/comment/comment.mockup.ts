import { delay } from 'rxjs/operators';
import { StorageAsyncResult } from 'src/app/models/interfaces/storage-async-result.interface';
import { CreateCommentPayload } from 'src/app/models/payloads/create-comment.payload';
import { CommentProxy, getFakeCommentProxy } from 'src/app/models/proxies/comment.proxy';
import { PaginatedCommentProxy, getFakeCommentPaginatedProxy } from 'src/app/models/proxies/paginated-comment.proxy';


/*** 
 * Método que retorna os meus comentários criados
 */
export async function getMyCommentsMockup(): Promise<StorageAsyncResult<CommentProxy[]>> {

    return Promise.resolve({
        error: undefined,
        success: [
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy()
        ]
    });
}

export async function getAllCommentsMockup(): Promise<StorageAsyncResult<CommentProxy[]>> {

    return Promise.resolve({
        error: undefined,
        success: [
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy()
        ]
    });
}

export async function getAllCommentsPaginatedMockup(currentPage: number, maxItens: number): Promise<StorageAsyncResult<PaginatedCommentProxy>> {

    let paginatedComment: PaginatedCommentProxy = getFakeCommentPaginatedProxy(),

        minIndex = (currentPage - 1) * maxItens,
        maxIndex = currentPage * maxItens,
        items = 0;

    // debugger;

    paginatedComment.items.map((comment, index) => {
        comment.id = index + 1;
        comment.personName += index + 1;
        items++;
    });

    paginatedComment.items = paginatedComment.items
        .filter((transformedComment, index) => {
            return minIndex <= index && index < maxIndex;
        });

    paginatedComment.pageCount = items / maxItens;
    paginatedComment.currentPage = currentPage;
    paginatedComment.maxItens = maxItens;

    return Promise.resolve({
        error: undefined,
        success: paginatedComment
    });
}
export async function getAllCommentsPaginatedByIdMockup(categoryId: number, currentPage: number, maxItens: number): Promise<StorageAsyncResult<PaginatedCommentProxy>> {

    let paginatedComment: PaginatedCommentProxy = getFakeCommentPaginatedProxy(),

        minIndex = (currentPage - 1) * maxItens,
        maxIndex = currentPage * maxItens,
        items = 0;


    paginatedComment.items.map((comment, index) => {
        comment.id = index + 1;
        comment.personName += index + 1;
        items++;
    });

    paginatedComment.items = paginatedComment.items
        .filter((transformedComment, index) => {
            return categoryId == transformedComment.category.id
                && minIndex <= index
                && index < maxIndex;
        });

    paginatedComment.pageCount = items / maxItens;
    paginatedComment.currentPage = currentPage;
    paginatedComment.maxItens = maxItens;

    return Promise.resolve({
        error: undefined,
        success: paginatedComment
    });
}

/*** 
 * Método que retorna as informações de um comentário criado com sucesso
 * 
 * @param payload As informações para a criação do comentário
 */
export async function createCommentMockup( payload: CreateCommentPayload): Promise<StorageAsyncResult<CommentProxy>> {
    
    await new Promise( resolve =>{
        setTimeout(resolve, 2000);
    });

    return Promise.resolve({
        success: getFakeCommentProxy(),
        error: undefined
    });
}