/* #region Imports*/

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { CategoryProxy } from 'src/modules/categories/model/category.proxy';
import { CommentEntity } from 'src/typeorm/entities/comment.entity';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';

/* #Endregion Imports*/

/*** 
 * A classe que representa as informações que são enviadas pela API sobre um comentário
 */
export class CommentProxy extends BaseCrudProxy {

    /* #region Constructor*/

    constructor(
        entity: CommentEntity,
    ) {
        super(entity);


        this.message =entity.message;
        this.categoryId = entity.categoryId;
        this.personName = entity.personName;
        this.personColor = entity.personColor;
        this.personEmoji = entity.personEmoji;
        this.category = !!entity.category && new CategoryProxy(entity.category) || void 0;
    }

    /* #Endregion Constructor*/

    /* #region Public Properties*/
    
    /*** 
     * A mensagem desse comentário
     */
    @ApiProperty()
    message: string;

    /*** 
     * O nome do autor desse comentáiro
     */
    @ApiProperty()
    personName: string;

    /*** 
     * O emoji que representa esse autor
     */
    @ApiProperty()
    personEmoji: string;

    /*** 
     * A cor que representa esse autor na foto
     */
    @ApiProperty()
    personColor: string;

    /*** 
     * A identificação da categoria
     */
    @ApiProperty()
    categoryId: number;

    /*** 
     * As informações da categoria desse comentário
     */
    @ApiPropertyOptional({type: () => CategoryProxy})
    category ?: CategoryProxy;    
    
    /* #Endregion Public Properties*/
}
