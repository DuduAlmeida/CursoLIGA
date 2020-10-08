
export class TrackablePage{

    /*** 
     * Método que retorna a identificação do item da lista para ser usado
     * para verificar se o item já existe na lista, caso exista, não
     * deve fazer alterações no HTML.
     * 
     * @param index o índice desse item na lista
     * @param value as indormações do item
     */
    public trackById(index: number, value: {id: number}): number{
        return value.id;
    }
}