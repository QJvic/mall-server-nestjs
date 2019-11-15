import { Module } from '@nestjs/common';
import { HomeIconController } from './home-icon.controller';
import { HomeIconService } from './home-icon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeIconEntity } from '../../core/entities/home-icon.entity';
import { CosService } from '../../core/shared-service/cos/cos.service';

@Module({
  imports: [TypeOrmModule.forFeature([HomeIconEntity])],
  controllers: [HomeIconController],
  providers: [HomeIconService, CosService],
})
export class HomeIconModule {}
