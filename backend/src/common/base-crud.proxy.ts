/* #region */

import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from './base-entity';

/* #Endregion */

/*** 
 * A classe base para toda Proxy
 */
export class BaseCrudProxy {

    /* #region Constructor*/

    constructor(
        private readonly entity: BaseEntity,
    ) {
        this.id = entity.id;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
    }

    /* #Endregion Constructor*/

    /* #region Public Properties*/

    /*** 
     * A identificação da entidade
     */
    @ApiProperty()
    id: number;

    /*** 
     * A data de quando foi criada essa entidade
     */
    @ApiProperty()
    createdAt: Date;

    /*** 
     * A data de quando foi atualizado pela última vez
     */
    @ApiProperty()
    updatedAt: Date;

    /* #Endregion Public Properties*/
}