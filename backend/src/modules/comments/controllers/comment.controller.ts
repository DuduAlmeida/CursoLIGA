/* #region Imports*/

import { Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CommentService } from '../services/comment.service';
import { CommentProxy } from '../model/comment.proxy';
import { PaginatedCommentProxy } from './../model/paginated-comment.payload';
import { CreateCommentPayload } from '../model/create-comment.payload';

/* #Endregion Imports*/

/*** 
 * A classe que representa a controller que lida com comentários
 */
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('comments')
@Controller('comments')
export class CommentController {

    /* #region Constructor*/

    constructor(
        private readonly service: CommentService,
    ) { }

    /* #Endregion Constructor*/

    /* #region Public Methods*/

    /*** 
     * Método que retorna várias informações da entidade de comentário
     * 
     * @param categoryId O identificador da categoria a pegar o comentário
     * @param page A página atual
     * @param maxItens A quantidade máxima de itens por página
     */
    @Get()
    @ApiOperation({ summary: 'Método que retorna uma lista de comentários de acordo com alguma categoria.' })
    @ApiOkResponse({ type: PaginatedCommentProxy })
    @ApiQuery({ name: 'page', required: false, example: 1, allowEmptyValue: false, description: 'A página atual da paginação.' })
    @ApiQuery({ name: 'maxItens', required: false, example: 5, allowEmptyValue: false, description: 'A quantidade máxima de itens por página. Min: 5 - Max: 100.' })
    @ApiQuery({ name: 'categoryId', required: false, example: 1, allowEmptyValue: false, description: 'O identificador da categoria que o comentário pertence. Min: 1.' })
    @ApiNotFoundResponse({ type: NotFoundException, description: 'O comentário que você buscou não existe' })
    public getMany(@Query('categoryId') categoryId?: number, @Query('page') page?: number, @Query('maxItens') maxItens?: number): Promise<PaginatedCommentProxy> {

        page = Number(page) || 1;
        maxItens = Number(maxItens) || 5;
        categoryId = Number(categoryId) || 0;

        return this.service.listMany(categoryId, page, maxItens);
    }

    /*** 
     * Método que retorna as informações de uma entidade de comentário
     * 
     * @param commentId O identificador do comentário
     */
    @Get('/:commentId')
    @ApiOperation({ summary: 'Método que retorna um comentário de acordo com alguma categoria.' })
    @ApiOkResponse({ type: CommentProxy })
    @ApiParam({name: 'commentId', required: true, example: 1, allowEmptyValue: false, description: 'O identficador do comentário.'})
    @ApiNotFoundResponse({ type: NotFoundException, description: 'A categoria que você buscou não existe' })
    public async getOne(@Param('commentId') commentId: number): Promise<CommentProxy> {

        return await this.service.get(commentId).then(response => new CommentProxy(response));
    }

    /*** 
     * Método que cria uma nova entidade
     * 
     * @param payload As informações para a criação da entidade de comentário
     */
    @Post()
    @ApiOperation({ summary: 'Método que cria uma novo comentário.' })
    @ApiOkResponse({ type: CommentProxy })
    public async createOne(@Body() payload: CreateCommentPayload): Promise<CommentProxy> {

        return await this.service.create(payload).then(response => new CommentProxy(response));
    }

    /* #Endregion Public Methods*/

}