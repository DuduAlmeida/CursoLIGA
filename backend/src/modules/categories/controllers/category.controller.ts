import { PaginatedCategoryProxy } from './../model/paginated-category.proxy';
/* #region Imports*/

import { Body, ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors, NotFoundException, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryProxy } from '../model/category.proxy';
import { CategoryService } from '../services/category.service';
import { CreateCategoryPayload } from '../model/create-category.payload';

/* #Endregion Imports*/

/*** 
 * A classe que representa a controller que lida com as categorias
 */
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('categories')
@Controller('categories')
export class CategoryController {

    /* #region Constructor*/

    constructor(
        private readonly service: CategoryService,
    ) {}

    /* #Endregion Constructor*/

    /* #region Public Methods*/

    /*** 
     * Método que retorna várias informações da entidade
     * 
     * @param page A página atual
     * @param maxItens A quantidade máxima de itens por página
     * @param search O termo para pesquisa de uma categoria
     */
    @Get()
    @ApiOperation({summary: 'Método que retorna uma lista de categorias.'})
    @ApiOkResponse({ type: PaginatedCategoryProxy })
    @ApiQuery({name: 'page', required: false, example: 1, allowEmptyValue: false, description: 'A página atual da paginação.'})
    @ApiQuery({name: 'maxItens', required: false, example: 5, allowEmptyValue: false, description: 'A quantidade máxima de itens por página. Min: 5 - Max: 100.'})
    @ApiQuery({name: 'search', required: false, example: 'Typescript', allowEmptyValue: false, description: 'A quantidade máxima de itens por página. Min: 5 - Max: 100.'})
    public async getMany(@Query('page') page?: number, @Query('maxItens') maxItens?: number, @Query('search') search?: string) : Promise<PaginatedCategoryProxy> {
        
        return await this.service.listMany(Number(page) || 1, Number(maxItens) || 5, search);
    }

    /*** 
     * Método que retorna as informações de uma entidade
     * 
     * @param categoryId A identificação da categoria
     */
    @Get('/:categoryId')
    @ApiOperation({summary: 'Método que retorna uma categoria baseada na sua identificação.'})
    @ApiOkResponse({ type: CategoryProxy })
    @ApiParam({name: 'categoryId', required: true, example: 1, allowEmptyValue: false, description: 'O identficador da categoria.'})
    @ApiNotFoundResponse({type: NotFoundException,description: 'A categoria que você buscou não existe'})
    public async getOne( @Param('categoryId') categoryId: number): Promise<CategoryProxy> {
        
        return await this.service.get(categoryId).then(response => new CategoryProxy(response));
    }

    /*** 
     * Método que cria uma nova entidade
     * 
     * @param payload As informações para a criação da entidade
     */
    @Post()
    @ApiOperation({summary: 'Método que cria uma nova categoria.'})
    @ApiOkResponse({ type: CategoryProxy })
    public async createOne(@Body() payload: CreateCategoryPayload): Promise<CategoryProxy> {
        
        return await this.service.create(payload).then(response => new CategoryProxy(response));
    }

    /* #Endregion Public Methods*/

}