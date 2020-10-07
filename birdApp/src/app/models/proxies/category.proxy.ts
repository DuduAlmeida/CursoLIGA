import { CommentProxy } from './comment.proxy';
/*** 
 * A interface que representa as informações de uma categoria vinda da API
 */
export interface CategoryProxy{

    /*** 
     * A identificação dessa categoria
     */
    id: number;

    /*** 
     * O nome dessa categoria
     */
    name: string;

    /*** 
     * A cor que representa a categoria
     */
    color: string;    

    /*** 
     * A lista de comentários existentes nessa categoria
     */
    comments?: CommentProxy[];
}