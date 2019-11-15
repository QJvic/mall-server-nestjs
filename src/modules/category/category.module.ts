import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../../core/entities/category.entity';
import { CosService } from '../../core/shared-service/cos/cos.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService, CosService],
  controllers: [CategoryController],
})
export class CategoryModule {}
