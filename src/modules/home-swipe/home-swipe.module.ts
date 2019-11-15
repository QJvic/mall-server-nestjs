import { Module } from '@nestjs/common';
import { HomeSwipeController } from './home-swipe.controller';
import { HomeSwipeService } from './home-swipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeSwipeEntity } from '../../core/entities/home-swipe.entity';
import { CosService } from '../../core/shared-service/cos/cos.service';

@Module({
  imports: [TypeOrmModule.forFeature([HomeSwipeEntity])],
  controllers: [HomeSwipeController],
  providers: [HomeSwipeService, CosService],
})
export class HomeSwipeModule {}
