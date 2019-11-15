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
import { FindResultInterceptor } from '../../core/interceptors/find-result.interceptor';
import { ListOptions } from '../../core/decorators/list-options.decorator';
import { HomeRecommendService } from './home-recommend.service';
import { HomeRecommendFindDto } from '../../core/dtos/home-recommend/home-recommend-find.dto';
import { HomeRecommendUpdateDto } from '../../core/dtos/home-recommend/home-recommend-update.dto';
import { HomeRecommendCreateDto } from '../../core/dtos/home-recommend/home-recommend-create.dto';

@ApiUseTags('推荐图管理')
@Controller('home-recommend')
export class HomeRecommendController {
  constructor(private readonly homeRecommendService: HomeRecommendService) {}

  @ApiOperation({ title: '获取推荐图' })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor, FindResultInterceptor)
  async index(@ListOptions() @Query() params: HomeRecommendFindDto) {
    const result = await this.homeRecommendService.find(params);
    return result;
  }

  @ApiOperation({ title: '新增推荐图' })
  @Post()
  async create(@Body() body: HomeRecommendCreateDto) {
    const result = await this.homeRecommendService.add(body);
    return result;
  }

  @ApiOperation({ title: '删除推荐图' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.homeRecommendService.delete(id);
    return result;
  }

  @ApiOperation({ title: '修改推荐图' })
  @Post(':id')
  async update(@Param('id') id: string, @Body() body: HomeRecommendUpdateDto) {
    const result = await this.homeRecommendService.update(id, body);
    return result;
  }
}
