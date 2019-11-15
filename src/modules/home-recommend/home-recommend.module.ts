import { Module } from '@nestjs/common';
import { HomeRecommendController } from './home-recommend.controller';
import { HomeRecommendService } from './home-recommend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeRecommendEntity } from '../../core/entities/home-recommend.entity';
import { CosService } from '../../core/shared-service/cos/cos.service';

@Module({
  imports: [TypeOrmModule.forFeature([HomeRecommendEntity])],
  controllers: [HomeRecommendController],
  providers: [HomeRecommendService, CosService],
})
export class HomeRecommendModule {}
