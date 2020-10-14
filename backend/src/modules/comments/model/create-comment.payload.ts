/* #region Imports*/

import { ApiProperty } from '@nestjs/swagger';

import { IsHexColor, IsDefined, IsString, MaxLength } from 'class-validator';

/* #Endregion Imports*/

/*** 
 * A classe que representa o payload enviado para criar um comentário
 */
export class CreateCommentPayload {

    /*** 
     * A mensagem desse comentário
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário informar a mensagem do comentário' })
    @IsString({ message: 'É necessário que a mensagem seja válida' })
    @MaxLength(1024, { message: 'Mensagem ultrapassou o limite de caracteres' })
    message: string;

    /*** 
     * O nome do autor desse comentário
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário informar o nome de quem gerou o comentário' })
    @IsString({ message: 'É necessário que o nome seja válido' })
    @MaxLength(64, { message: 'O nome ultrapassou o limite de caracteres' })
    personName: string;

    /*** 
     * O emjoi que representa esse autor
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário informar o emoji do comentário' })
    @IsString({ message: 'É necessário que o emoji seja válida' })
    @MaxLength(124, { message: 'O emoji ultrapassou o limite de espaço' })
    personEmoji: string;

    /*** 
     * A cor de fundo da foto dessa pessoa
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário informar a cor do comentário' })
    @IsString({ message: 'É necessário que a cor seja válida' })
    @IsHexColor({ message: 'É necessário que seja um HEX válido' })
    @MaxLength(7, { message: 'A cor ultrapassou o limite de caracteres' })
    personColor: string;

    /*** 
     * A identificação da categoria
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário informar o id da categoria do comentário' })
    categoryId: number;

}