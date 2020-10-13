import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

import { CommentProxy, getFakeCommentProxy } from 'src/app/models/proxies/comment.proxy';
import { environment } from 'src/environments/environment';
import { createCommentMockup, getAllCommentsMockup, getAllCommentsPaginatedMockup, getMyCommentsMockup } from './comment.mockup';
import { StorageAsyncResult } from 'src/app/models/interfaces/storage-async-result.interface';
import { PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';
import { CreateCommentPayload } from 'src/app/models/payloads/create-comment.payload';


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

        if (environment.mockupEnabled)
            return await getMyCommentsMockup();

        await this.storage.set(environment.keys.myComments, [
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy()
        ]);

        await this.storage.ready().catch(console.error);

        return this.storage.get(environment.keys.myComments)
            .then(success => ({ success, error: undefined }))
            .catch(() => ({ success: undefined, error: 'Ocorreu um erro ao buscar do cache, tente novamente' }));
    }

    public async getAllComments(): Promise<StorageAsyncResult<CommentProxy[]>> {

        if (environment.mockupEnabled)
            return await getAllCommentsMockup();


        const url = environment.api.comment.list;

        return await this.http.get<CommentProxy[]>(url)
            .toPromise()
            .then(success => ({ success, error: undefined }))
            .catch((error) => ({ success: undefined, error }));
    }

    public async getAllCommentsPaginated(currentPage: number, maxItens: number): Promise<StorageAsyncResult<PaginatedCommentProxy>> {

        if (environment.mockupEnabled)
            return await getAllCommentsPaginatedMockup(currentPage, maxItens);

        const url = environment.api.comment.listPaginated
            .replace('{currentPage}', currentPage.toString())
            .replace('{maxItens}', maxItens.toString());

        return await this.http.get<PaginatedCommentProxy>(url)
            .toPromise()
            .then(success => ({ success, error: undefined }))
            .catch((error) => ({ success: undefined, error }));
    }

    /*** 
     * Método que cria um novo comentário
     * 
     * @param payload As informaçõs para a criação do comentário
     */
    public async createComment(payload: CreateCommentPayload): Promise<StorageAsyncResult<CommentProxy>> {
        
        if (environment.mockupEnabled)
            return await createCommentMockup(payload);

        const url = environment.api.comment.create;

        return await this.http.post<CommentProxy>(url, payload)
            .toPromise()
            .then(success => ({ success, error: undefined }))
            .catch((error) => ({ success: undefined, error }));
    }

    /*** 
     * Método que salva um comentário no cache
     * 
     * @param comment As informações do comentário
     */
    public async saveCommentCreated(comment: CommentProxy): Promise<StorageAsyncResult<boolean>>{

        await this.storage.ready().catch(console.error);

        const {success}  = await this.storage.get(environment.keys.myComments)
            .then(success => ({ success, error: undefined }))
            .catch(() => ({ success: undefined, error: 'Ocorreu um erro ao buscar do cache, tente novamente' }));

        const myComments = [...(success || []), comment];

        return await this.storage.set(environment.keys.myComments, myComments)
            .then(() => ({ success: true, error: undefined }))
            .catch(() => ({ success: undefined, error: 'Ocorreu um erro ao buscar do cache, tente novamente' }));
    }
    /* #Endregion Storage methods*/
}
