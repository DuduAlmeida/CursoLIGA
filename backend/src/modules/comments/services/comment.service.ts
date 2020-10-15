import { PaginatedCommentProxy } from './../model/paginated-comment.payload';
/* #region Imports*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/typeorm/entities/comment.entity';

import { Repository } from 'typeorm';
import { UpdateCommentPayload } from '../model/update-comment.payload';
import { CreateCommentPayload } from '../model/create-comment.payload';
import { isValid } from 'src/utils/functions';

/* #Endregion Imports*/

/*** 
 * A classe que representa o serviço que lida com os comentários
 */
@Injectable()
export class CommentService {

    /* #region Constructor*/
    constructor(
        @InjectRepository(CommentEntity)
        public repository: Repository<CommentEntity>,
    ) { }

    /* #Endregion Constructor*/

    /* #region Private Properties*/

    /*** 
     * A quantidade máxima de itens por paginação
     * @private
     */
    private readonly maxItensPerPage = 100;

    /*** 
     * A quantidade mínima de itens por paginação
     * @private
     */
    private readonly minItensPerPage = 5;

    /* #Endregion Private Properties*/

    /* #region Crud Methods*/

    /*** 
     * Método que retorna uma lista com os comentários, filtrada por uma categoria
     * 
     * @param categoryId O identificador da categoria que esse comentário percente
     * @param currentPage A página atual
     * @param maxItens A quantidade máxima de itens
     * @param includeCategory Diz se deve incluir as indormações da categoria do comentário
     */
    public async listMany(
        categoryId: number,
        currentPage: number,
        maxItens: number,
        includeCategory: boolean,
    ): Promise<PaginatedCommentProxy> {

        currentPage = Math.max(1, currentPage);
        maxItens = Math.max(this.minItensPerPage, Math.min(this.maxItensPerPage, maxItens));

        let query = this.repository.createQueryBuilder('comment');

        //Caso tenham dois wheres em uma query, o segundo deve ser andWhere
        if (categoryId)
            query = query.where('comment.categoryId = :categoryId', { categoryId });

        if (includeCategory)
            query = query.leftJoinAndSelect('comment.category', 'category');

        const [entities, total] = await query
            .take(maxItens)
            .skip((currentPage - 1) * maxItens)
            .orderBy('comment.createdAt', 'DESC')
            .getManyAndCount();

        const pageCount = Math.ceil(total / maxItens);

        return new PaginatedCommentProxy(
            entities,
            currentPage,
            pageCount,
            maxItens,
        );
    }

    /*** 
     * Método que retorna uma entidade
     * 
     * @param commentId O identificador do comentário
     */
    public async get(commentId: number): Promise<CommentEntity> {
        const entity = await this.repository.findOne({
            where: {
                id: Number(commentId) || 0,
            }
        });

        if (!entity)
            throw new NotFoundException('O comentário que você procura não existe ou foi removido.');

        return entity;
    }

    /*** 
     * Método que cria uma entidade
     * 
     * @param payload As informações para a criação do comentário
     */
    public async create(payload: CreateCommentPayload): Promise<CommentEntity> {
        const entity = this.getEntityFromPayload(payload);

        return await this.repository.save(entity);
    }

    /* #Endregion Crud Methods*/

    /* #region Private Methods*/

    /*** 
     * Método que retorna as informações de uma entidade a partir das informações do payload
     * 
     * @param payload As informações do payload
     * @param entityId A identificação da entidade
     */
    private getEntityFromPayload(payload: CreateCommentPayload | UpdateCommentPayload, entityId?: number): CommentEntity {
        return new CommentEntity({
            ...isValid(entityId) && { id: entityId },
            ...isValid(payload.message) && { message: payload.message },
            ...isValid(payload.personName) && { personName: payload.personName },
            ...isValid(payload.personEmoji) && { personEmoji: payload.personEmoji },
            ...isValid(payload.personColor) && { personColor: payload.personColor },
            ...isValid(payload.categoryId) && { categoryId: payload.categoryId },
        })
    }

    /* #Endregion Private Methods*/
}