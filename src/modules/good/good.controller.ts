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
import { GoodService } from './good.service';
import { FindResultInterceptor } from '../../core/interceptors/find-result.interceptor';
import { GoodTagAddDto } from '../../core/dtos/good/good-tag-add.dto';
import { GoodAddDto } from '../../core/dtos/good/good-add.dto';
import { GoodImageAddDto } from '../../core/dtos/good/good-image-add.dto';
import { GoodUpdateDto } from '../../core/dtos/good/good-update.dto';
import { GoodFindDto } from '../../core/dtos/good/good-find.dto';

@ApiUseTags('商品')
@Controller('good')
export class GoodController {
  constructor(private readonly goodService: GoodService) {}

  @ApiOperation({ title: '测试' })
  @Get('ttt')
  async test() {
    const result = await this.goodService.test();
    return result;
  }

  @ApiOperation({ title: '获取所有常用tags' })
  @Get('tags')
  @UseInterceptors(ClassSerializerInterceptor, FindResultInterceptor)
  async findTags() {
    const result = await this.goodService.findTags();
    return result;
  }

  @ApiOperation({ title: '新增tags' })
  @Post('tags')
  async addTags(@Body() body: GoodTagAddDto) {
    const result = await this.goodService.addTags(body);
    return result;
  }

  @ApiOperation({ title: '删除tags' })
  @Delete('tags')
  async deleteTags(@Param('id') id: string) {
    const result = await this.goodService.deleteTags(id);
    return result;
  }

  @ApiOperation({ title: '新增商品(文字信息)' })
  @Post()
  async addGoodTxt(@Body() body: GoodAddDto) {
    const result = await this.goodService.addGood(body);
    return result;
  }

  @ApiOperation({ title: '删除商品' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.goodService.delete(id);
    return result;
  }

  @ApiOperation({ title: '修改商品（文字信息）' })
  @Post(':id')
  async update(@Param('id') id: string, @Body() body: GoodUpdateDto) {
    const result = await this.goodService.update(id, body);
    return result;
  }

  @ApiOperation({ title: '新增商品图片' })
  @Post('image')
  async addGoodImage(@Body() body: GoodImageAddDto) {
    const result = await this.goodService.addGoodImage(body);
    return result;
  }

  @ApiOperation({ title: '删除商品图片' })
  @Delete('image/:id')
  async deleteGoodImage(@Param('id') id: string) {
    const result = await this.goodService.deleteGoodImage(id);
    return result;
  }

  @ApiOperation({ title: '获取商品轮播图' })
  @Get(':id')
  async findGoodImage(@Param('id') id: string) {
    const result = await this.goodService.findGoodImage(id);
    return result;
  }

  @ApiOperation({ title: '获取商品,不获取其轮播图和详情图' })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor, FindResultInterceptor)
  async findGoods(@Query() params: GoodFindDto) {
    const result = await this.goodService.findGoods(params);
    return result;
  }
}
