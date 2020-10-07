import { CategoryProxy } from './category.proxy';

/*** 
 * A interface que representa as informações de um comentário vindos da API
 */
export interface CommentProxy{

    /*** 
     * A identificação desse comentário
     */
    id: number;

    /*** 
     * A data de quando foi criado
     */
    createdAt: string;

    /*** 
     * A mensagem desse comentário
     */
    message: string;

    /*** 
     * O nome do autor desse comentáiro
     */
    personName: string;

    /*** 
     * O emoji que representa esse autor
     */
    personEmoji: string;

    /*** 
     * A cor que representa esse autor na foto
     */
    personColor: string;

    /*** 
     * A identificação da categoria
     */
    categoryId: number;

    /*** 
     * As informações sobre a categoria
     */
    category?: CategoryProxy;

}


export function getFakeCommentProxy(): CommentProxy{
    return {
        id: 1,
        message: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, ',
        createdAt: new Date().toISOString(),
        personName: 'Alice Smith',
        personColor: '#ff565e',
        personEmoji: '🐄',
        categoryId: 2,
        category: {
          name: 'Typescript',
          color: '#ffc542',      
          id: 2
        }
      };
}