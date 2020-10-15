/* #region Imports*/

import { ApiProperty } from '@nestjs/swagger';

import { BasePaginatedProxy } from './../../../common/base-paginated.proxy';
import { CommentProxy } from './comment.proxy';
import { CommentEntity } from 'src/typeorm/entities/comment.entity';

/* #Endregion Imports*/

/*** 
 * A classe que representa os resultados paginados das categorias
 */
export class PaginatedCommentProxy extends BasePaginatedProxy {

    /* #region Constructor*/

    constructor(
        entities: CommentEntity[],
        currentPage: number,
        pageCount: number,
        maxItens: number,
    ) { 
        super(currentPage,pageCount,maxItens);

        this.items = Array.isArray(entities) && entities.map(comment => new CommentProxy(comment));
    }

    /* #Endregion Constructor*/

    /* #region Public Properties*/

    /**
     * Os itens dessa páginação
     */
    @ApiProperty({type: () => CommentProxy, isArray: true})
    items: CommentProxy[];

    /* #Endregion Public Properties*/
}