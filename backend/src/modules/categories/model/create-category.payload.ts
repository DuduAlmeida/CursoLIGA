/* #region Imports*/

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsHexColor, IsString, MaxLength } from 'class-validator';

/* #Endregion Imports*/

/*** 
 * A classe que representa o payload enviado para criar uma categoria
 */
export class CreateCategoryPayload {

    /*** 
     * O nome dessa categoria
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário enviar o nome da categoria' })
    @IsString({ message: 'É necessário enviar um texto válido para o nome da categoria' })
    @MaxLength(64, { message: 'O nome da categoria não pode exceder 64 caracteres' })
    name: string;

    /*** 
     * A cor dessa categoria
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário enviar o cor da categoria' })
    @IsString({ message: 'É necessário enviar um texto válido para o cor da categoria' })
    @IsHexColor({ message: 'É necessário enviar um HEX válido para a cor da categoria' })
    color: string;

}