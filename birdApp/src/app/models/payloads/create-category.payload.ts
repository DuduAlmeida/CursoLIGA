/*** 
 * A interface que representa as informações necessárias para a criação de uma categoria
 */
export interface CreateCategoryPayload{

    /*** 
     * O nome dessa categoria
     */
    name: string;

    /*** 
     * A cor que representa a categoria
     */
    color: string;
}