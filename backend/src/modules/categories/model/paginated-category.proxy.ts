/* #region Imports*/

import { ApiProperty } from '@nestjs/swagger';
import { BasePaginatedProxy } from './../../../common/base-paginated.proxy';
import { CategoryProxy } from './category.proxy';
import { CategoryEntity } from 'src/typeorm/entities/category.entity';

/* #Endregion Imports*/

/*** 
 * A classe que representa os resultados paginados das categorias
 */
export class PaginatedCategoryProxy extends BasePaginatedProxy {

    /* #region Constructor*/

    constructor(
        entities: CategoryEntity[],
        currentPage: number,
        pageCount: number,
        maxItems: number,
    ) { 
        super(currentPage,pageCount,maxItems);

        this.items = Array.isArray(entities) && entities.map(category => new CategoryProxy(category));
    }

    /* #Endregion Constructor*/

    /* #region Public Properties*/

    /**
     * Os itens dessa páginação
     */
    @ApiProperty({type: () => CategoryProxy, isArray: true})
    items: CategoryProxy[];

    /* #Endregion Public Properties*/
}