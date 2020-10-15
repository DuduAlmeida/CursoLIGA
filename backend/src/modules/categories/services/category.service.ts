/* #region Imports*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/typeorm/entities/category.entity';
import { isValid } from 'src/utils/functions';

import { Like, Repository } from 'typeorm';
import { CreateCategoryPayload } from '../model/create-category.payload';
import { PaginatedCategoryProxy } from '../model/paginated-category.proxy';

/* #Endregion Imports*/

/*** 
 * A classe que representa o serviço que lida com as categorias
 */
@Injectable()
export class CategoryService {

    /* #region Constructor*/
    constructor(
        @InjectRepository(CategoryEntity)
        public repository: Repository<CategoryEntity>,
    ) { }

    /* #Endregion Constructor*/

    /* #region Private Properties*/
    
    /*** 
     * A quantidade máxima de itens por paginação
     * @private
     */
    private readonly maxItemsPerPage = 100;
    
    /*** 
     * A quantidade mínima de itens por paginação
     * @private
     */
    private readonly minItemsPerPage = 5;
    
    /* #Endregion Private Properties*/

    /* #region Crud Methods*/

    /*** 
     * Método que retorna uma lista com as entidades paginadas
     * 
     * @param currentPage A página atual
     * @param maxItems A quantidade máxima de itens
     * @param search O termo para pesquisa de uma categoria
     */
    public async listMany(currentPage: number, maxItems: number, search: string): Promise<PaginatedCategoryProxy> {
        //Math.min(v1, v2) => retorna o menor dos dois valores passados
        //Math.max(v1, v2) => retorna o maior dos dois valores passados
        currentPage = Math.max(1, currentPage);
        maxItems = Math.max(this.minItemsPerPage, Math.min(this.maxItemsPerPage, maxItems));

        let query =  this.repository.createQueryBuilder('category');

        if(search)
            query = query.where('LOWER(category.name) LIKE :search', {search: `%${search.toLowerCase()}%`});

        const [entities, total] = await query            
            .skip((currentPage - 1) * maxItems)
            .take(maxItems)
            .orderBy('name', 'ASC')
            .getManyAndCount();

        const pageCount = Math.ceil(total / maxItems);

        return new PaginatedCategoryProxy(
            entities,
            currentPage,
            pageCount,
            maxItems,
        );
    }

    /*** 
     * Método que retorna uma lista com as entidades
     * 
     * @param entityId A identificação da entidade que está sendo procurada
     */
    public async get(entityId: number): Promise<CategoryEntity> {
        const entity = await this.repository.findOne({
            where: {
                id: Number(entityId) || 0,
            }
        });

        if (!entity)
            throw new NotFoundException('A categoria que você procura não existe ou foi removida.');

        return entity;
    }

    /*** 
     * Método que cria uma entidade
     * 
     * @param payload As informações para a criação
     */
    public async create(payload: CreateCategoryPayload): Promise<CategoryEntity> {
        const entity = this.getEntityFromPayload(payload);

        return await this.repository.save(entity);
    }


    /* #Endregion Crud Methods*/

    /* #region Private Methods*/

    /*** 
     * Método que retorna as informações de uma entidade a partir das informações do payload
     * 
     * @param payload As informações do payload
     */
    private getEntityFromPayload(payload: CreateCategoryPayload): CategoryEntity {
        return new CategoryEntity({
            ...isValid(payload.name) && { name: payload.name },
            ...isValid(payload.color) && { color: payload.color },
        })
    }

    /* #Endregion Private Methods*/
}