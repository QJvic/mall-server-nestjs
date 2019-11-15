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
import { CategoryService } from './category.service';
import { DataFormatInterceptor } from '../../core/interceptors/data-format.interceptor';
import { FindResultInterceptor } from '../../core/interceptors/find-result.interceptor';
import { CategoryAddDto } from '../../core/dtos/category/category-add.dto';
import { CategoryFindDto } from '../../core/dtos/category/category-find.dto';
import { CategoryUpdateDto } from '../../core/dtos/category/category-update.dto';

@ApiUseTags('分类管理')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ title: '查找' })
  @Get()
  async find(@Query() params: CategoryFindDto) {
    const result = await this.categoryService.find(params);
    const newResult = { rows: result };
    return newResult;
  }

  @ApiOperation({ title: '新增' })
  @Post()
  async add(@Body() body: CategoryAddDto) {
    const result = await this.categoryService.add(body);
    return result;
  }

  @ApiOperation({ title: '删除' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.categoryService.delete(id);
    return result;
  }

  @ApiOperation({ title: '更新' })
  @Post(':id')
  async update(@Param('id') id: string, @Body() body: CategoryUpdateDto) {
    const result = await this.categoryService.update(id, body);
    return result;
  }
}
