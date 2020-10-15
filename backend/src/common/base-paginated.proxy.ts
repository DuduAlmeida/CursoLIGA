/* #region Imports*/

import { ApiProperty } from '@nestjs/swagger';

/* #Endregion Imports*/

/*** 
 * A classe que representa os resultados paginados
 */
export class BasePaginatedProxy {

    /* #region Constructor*/
        
    constructor(
        currentPage: number,
        pageCount: number,
        maxItems: number,
    ) {
        this.currentPage = currentPage;
        this.pageCount = pageCount;
        this.maxItens = maxItems;
    }
    
    /* #Endregion Constructor*/

    /* #region Public Properties*/
        
    /***
     * O indice atual da paginação
     */
    @ApiProperty()
    currentPage: number;

    /***
     * O total de paǵinas dessa paginação
     */
    @ApiProperty()
    pageCount: number;

    /***
     * O total de itens por página
     */
    @ApiProperty()
    maxItens: number;
    
    /* #Endregion Public Properties*/
}