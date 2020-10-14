/* #region Imports*/

import { ApiProperty } from '@nestjs/swagger';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { CategoryEntity } from 'src/typeorm/entities/category.entity';

/* #Endregion Imports*/

/*** 
 * A classe que representa as informações que são enviadas pela API sobre uma categoria
 */
export class CategoryProxy extends BaseCrudProxy {

    /* #region Constructor*/

    constructor(
        entity: CategoryEntity,
    ) {
        super(entity);


        this.name = entity.name;
        this.color = entity.color;
        // this.comments = Array.isArray(entity.comments) && entity.comments.map(comment => new CommentProxy(comment)) || [];
    }

    /* #Endregion Constructor*/

    /* #region Public Properties*/
    
    /*** 
     * O nome dessa categoria
     */
    @ApiProperty()
    name: string;

    /*** 
     * A cor dessa categoria
     */
    @ApiProperty()
    color: string;

    /*** 
     * A lista de comentários dessa categoria
     */
    //  TODO: Criar o CommentProxy
    // @ApiProperty({type: () => CommentEntity, isArray:true})
    // comments: CommentProxy[];
    
    /* #Endregion Public Properties*/
}
