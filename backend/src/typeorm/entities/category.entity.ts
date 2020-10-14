/* #region Imports*/

import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/common/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { CommentEntity } from './comment.entity';

/* #Endregion Imports*/

/***
 * A classe que representa a entidade que lida com as informações de uma categoria
 */
@Entity('categories')
export class CategoryEntity extends BaseEntity {

    /* #region Constructor*/

    constructor (
        partial: Partial<CategoryEntity> | CategoryEntity,
    ){
        super();
        Object.assign(this, { ...partial });
    }

    /* #Endregion Constructor*/

    /* #region Public Properties*/
    
    /*** 
     * O nome dessa categoria
     */
    @ApiProperty()
    @Column({length: 64, nullable: false})
    name: string;

    /*** 
     * A cor dessa categoria
     */
    @ApiProperty()
    @Column({length: 7, nullable: false})
    color: string;

    /*** 
     * A lista de comentários dessa categoria
     */
    @ApiProperty({type: () => CommentEntity})
    @OneToMany(() => CommentEntity, comment => comment.categoryId)
    comments: CommentEntity[];
    
    /* #Endregion Public Properties*/

}