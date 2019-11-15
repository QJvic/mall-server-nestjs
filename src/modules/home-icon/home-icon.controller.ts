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
} from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { HomeIconService } from './home-icon.service';
import { FindResultInterceptor } from '../../core/interceptors/find-result.interceptor';
import { ListOptions } from '../../core/decorators/list-options.decorator';
import { HomeSwipeFindDto } from '../../core/dtos/home-swipe/home-swipe-find.dto';
import { HomeSwipeCreateDto } from '../../core/dtos/home-swipe/home-swipe-create.dto';
import { HomeSwipeUpdateDto } from '../../core/dtos/home-swipe/home-swipe-update.dto';

@ApiUseTags('首页图标')
@Controller('home-icon')
export class HomeIconController {
  constructor(private readonly homeIconService: HomeIconService) {}

  @ApiOperation({ title: '获取图标' })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor, FindResultInterceptor)
  async index(@ListOptions() @Query() params: HomeSwipeFindDto) {
    const result = await this.homeIconService.find(params);
    return result;
  }

  @ApiOperation({ title: '新增图标' })
  @Post()
  async create(@Body() body: HomeSwipeCreateDto) {
    const result = await this.homeIconService.add(body);
    return result;
  }

  @ApiOperation({ title: '删除图标' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.homeIconService.delete(id);
    return result;
  }

  @ApiOperation({ title: '修改图标' })
  @Post(':id')
  async update(@Param('id') id: string, @Body() body: HomeSwipeUpdateDto) {
    const result = await this.homeIconService.update(id, body);
    return result;
  }
}
