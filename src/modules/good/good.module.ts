import { Module } from '@nestjs/common';
import { GoodController } from './good.controller';
import { GoodService } from './good.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodEntity } from '../../core/entities/good.entity';
import { GoodTagEntity } from '../../core/entities/good-tag.entity';
import { GoodImageEntity } from '../../core/entities/good-image.entity';
import { CosService } from '../../core/shared-service/cos/cos.service';
import { CategoryEntity } from '../../core/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GoodEntity,
      GoodTagEntity,
      GoodImageEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [GoodController],
  providers: [GoodService, CosService],
})
export class GoodModule {}
