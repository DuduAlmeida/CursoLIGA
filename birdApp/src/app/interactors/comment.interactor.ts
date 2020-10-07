import { getFakeCommentProxy } from 'src/app/models/proxies/comment.proxy';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentProxy } from '../models/proxies/comment.proxy';
import { StorageAsyncResult } from '../models/interfaces/storage-async-result.interface';
import { environment } from 'src/environments/environment';
import { getMyCommentsMockup } from './comment.mockup';

/*** 
 * A classe que representa o interactor que lida com os comentários da aplicação
 */
@Injectable({
    providedIn: 'root'
})
export class CommentInteractor {

    constructor(
        private readonly http: HttpClient,
        private readonly storage: Storage,
    ) { }

    /* #region Storage methods*/

    /*** 
     * Método que retorna os meus comentários criados
     */
    public async getMyComments(): Promise<StorageAsyncResult<CommentProxy[]>> {

        if( environment.mockupEnabled)
            return await getMyCommentsMockup();

        await this.storage.set(environment.keys.myComments, [
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
        ])

        await this.storage.ready().catch(console.error);

        return this.storage.get(environment.keys.myComments)
            .then(success => ({ success, error: undefined }))
            .catch(() => ({ success: undefined, error: 'Ocorreu um erro ao buscar do cache, tente novamente' }));
    }

    /* #Endregion Storage methods*/
}
