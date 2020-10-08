import { CommentProxy, getFakeCommentProxy } from '../models/proxies/comment.proxy';
import { StorageAsyncResult } from '../models/interfaces/storage-async-result.interface';
import { getFakeCommentPaginatedProxy, PaginatedCommentProxy } from '../models/proxies/paginated-comment.proxy';

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
        items =0;

    // debugger;

    paginatedComment.items.map((comment, index) => {
        comment.id = index;
        comment.personName += index;
        items++;
    });

    paginatedComment.items = paginatedComment.items
    .filter((transformedComment, index) => {
        return minIndex <= index && index < maxIndex;
    });

    paginatedComment.pageCount = items/ maxItens;
    paginatedComment.currentPage = currentPage;
    paginatedComment.maxItens = maxItens;

    return Promise.resolve({
        error: undefined,
        success: paginatedComment
    });
}