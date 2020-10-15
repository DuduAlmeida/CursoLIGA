/* #region Imports*/

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmService } from './modules/typeorm/type-orm.service';
import { CategoryModule } from './modules/categories/category.module';

/* #Endregion Imports*/

/*** 
 * Módulo principal da aplicação
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoryModule
  ],
})
export class AppModule {  }
