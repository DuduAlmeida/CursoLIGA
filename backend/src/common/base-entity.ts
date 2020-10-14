/* #region Imports*/

import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/* #Endregion Imports*/

/*** 
 * A classe base para toda entidade
 */
export class BaseEntity{

    /*** 
     * A identificação da entidade
     */
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    /*** 
     * A data de quando foi criada essa entidade
     */
    @CreateDateColumn()
    @ApiProperty()
    createdAt: Date;

    /*** 
     * A data de quando foi atualizado pela última vez
     */
    @UpdateDateColumn()
    @ApiProperty()
    updatedAt: Date;
}