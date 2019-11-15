import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeSwipeModule } from './modules/home-swipe/home-swipe.module';
import { HomeIconModule } from './modules/home-icon/home-icon.module';
import { HomeRecommendModule } from './modules/home-recommend/home-recommend.module';
import { CategoryModule } from './modules/category/category.module';
import { GoodModule } from './modules/good/good.module';
import { LoginModule } from './modules/login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { mysqlOpt } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: mysqlOpt.host,
      port: mysqlOpt.port,
      username: mysqlOpt.username,
      password: mysqlOpt.password,
      database: mysqlOpt.database,
      logging: true,
      synchronize: true,
      entities: [__dirname + '/core/entities/*.entity{.ts,.js}'],
    }),
    HomeSwipeModule,
    HomeIconModule,
    HomeRecommendModule,
    CategoryModule,
    GoodModule,
    LoginModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
