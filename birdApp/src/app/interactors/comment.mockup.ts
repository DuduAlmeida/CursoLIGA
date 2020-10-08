import { CommentProxy, getFakeCommentProxy } from '../models/proxies/comment.proxy';
import { StorageAsyncResult } from '../models/interfaces/storage-async-result.interface';

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

export async function getAllCommentsPaginatedMockup(currentPage: number, maxItens: number): Promise<StorageAsyncResult<CommentProxy[]>> {

    let allComments = [
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy(),
        getFakeCommentProxy()
    ],
        minIndex = (currentPage - 1) * maxItens,
        maxIndex = currentPage * maxItens;

    // debugger;

    allComments.map((comment, index) => {
        comment.id = index;
        comment.personName += index;
    });


    return Promise.resolve({
        error: undefined,
        success: allComments
            .filter((transformedComment, index) => {
                return minIndex <= index && index < maxIndex;
            })
    });
}