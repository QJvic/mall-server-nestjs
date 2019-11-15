import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { ListOptions } from '../../core/decorators/list-options.decorator';
import { ListOptionsInterface } from '../../core/interfaces/list-options.interface';
import { HomeSwipeFindDto } from '../../core/dtos/home-swipe/home-swipe-find.dto';
import { HomeSwipeService } from './home-swipe.service';
import { Transform } from 'class-transformer';
import { validationPipe } from '../../core/pipes/validation.pipe';
import { FindResultInterceptor } from '../../core/interceptors/find-result.interceptor';
import { HomeSwipeCreateDto } from '../../core/dtos/home-swipe/home-swipe-create.dto';
import { HomeSwipeUpdateDto } from '../../core/dtos/home-swipe/home-swipe-update.dto';

@ApiUseTags('轮播图')
@Controller('home-swipe')
export class HomeSwipeController {
  constructor(private readonly homeSwipeService: HomeSwipeService) {}

  @ApiOperation({ title: '获取轮播图' })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor, FindResultInterceptor)
  async index(@ListOptions() @Query() params: HomeSwipeFindDto) {
    const result = await this.homeSwipeService.find(params);
    return result;
  }

  @ApiOperation({ title: '新增轮播图' })
  @Post()
  async create(@Body() body: HomeSwipeCreateDto) {
    const result = await this.homeSwipeService.add(body);
    return result;
  }

  @ApiOperation({ title: '删除轮播图' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.homeSwipeService.delete(id);
    return result;
  }

  @ApiOperation({ title: '修改轮播图' })
  @Post(':id')
  async update(@Param('id') id: string, @Body() body: HomeSwipeUpdateDto) {
    const result = await this.homeSwipeService.update(id, body);
    return result;
  }
}
