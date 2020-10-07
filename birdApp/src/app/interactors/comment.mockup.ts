import { CommentProxy , getFakeCommentProxy} from '../models/proxies/comment.proxy';
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