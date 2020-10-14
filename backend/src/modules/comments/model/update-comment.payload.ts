/* #region Imports*/

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsString, MaxLength, IsHexColor, IsOptional, IsDefined } from 'class-validator';

/* #Endregion Imports*/

/*** 
 * A classe que representa o payload enviado para criar um comentário
 */
export class UpdateCommentPayload {

    /*** 
     * A mensagem desse comentário
     */
    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: 'É necessário que a mensagem seja válida' })
    @MaxLength(1024, { message: 'Mensagem ultrapassou o limite de caracteres' })
    message?: string;

    /*** 
     * O nome do autor desse comentário
     */
    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: 'É necessário que o nome seja válido' })
    @MaxLength(64, { message: 'O nome ultrapassou o limite de caracteres' })
    personName?: string;

    /*** 
     * O emjoi que representa esse autor
     */
    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: 'É necessário que o emoji seja válida' })
    @MaxLength(124, { message: 'O emoji ultrapassou o limite de espaço' })
    personEmoji?: string;

    /*** 
     * A cor de fundo da foto dessa pessoa
     */
    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: 'É necessário que a cor seja válida' })
    @IsHexColor({ message: 'É necessário que seja um HEX válido' })
    @MaxLength(7, { message: 'A cor ultrapassou o limite de caracteres' })
    personColor?: string;

    /*** 
     * A identificação da categoria
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário informar o id da categoria do comentário' })
    categoryId: number;

}