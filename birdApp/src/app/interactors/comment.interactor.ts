import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

import { getFakeCommentProxy } from 'src/app/models/proxies/comment.proxy';
import { CommentProxy } from '../models/proxies/comment.proxy';
import { StorageAsyncResult } from '../models/interfaces/storage-async-result.interface';
import { environment } from 'src/environments/environment';
import { getAllCommentsMockup, getAllCommentsPaginatedMockup, getMyCommentsMockup } from './comment.mockup';

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
        let result;

        if (environment.mockupEnabled)
            return await getAllCommentsMockup();


        this.http.get<any[]>(`${environment.api.baseUrl}/${environment.api.comment}`)
            //Caso precise tratar a resposta da API:
            // .pipe(
            //     map(resData => {
            //         return resData
            //     })
            // )
            .subscribe(transformedData => {
                result = Promise.resolve({ success: transformedData, error: undefined })
                    .catch(() => ({ success: undefined, error: 'Ocorreu um erro ao buscar os dados da api, tente novamente' }));
            });
        return result;
    }

    public async getAllCommentsPaginated(currentPage: number, maxItens: number): Promise<StorageAsyncResult<CommentProxy[]>> {
        let result: Promise<StorageAsyncResult<CommentProxy[]>>;

        if (environment.mockupEnabled)
            return await getAllCommentsPaginatedMockup(currentPage, maxItens);


        this.http.get<any[]>(`${environment.api.baseUrl}/${environment.api.comment}`)
            //Caso precise tratar a resposta da API:
            // .pipe(
            //     map(resData => {
            //         return resData
            //     })
            // )
            .subscribe(transformedData => {
                result = Promise.resolve({ success: transformedData, error: undefined })
                    .catch(() => ({ success: undefined, error: 'Ocorreu um erro ao buscar os dados da api, tente novamente' }));
            });
        return result;
    }

    /* #Endregion Storage methods*/
}
