import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsBase64,
  IsBoolean,
  IsEnum,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GoodFindDto {
  @ApiModelPropertyOptional({ description: 'page', default: 1 })
  @Transform(value => Number(value))
  @IsNumber()
  readonly page: number;

  @ApiModelPropertyOptional({ description: 'pagesize', default: 10 })
  @Transform(value => Number(value))
  @IsNumber()
  readonly limit: number;

  @ApiModelPropertyOptional({ description: 'order', default: 'created' })
  @IsString()
  readonly sort: string;

  @ApiModelPropertyOptional({
    description: 'sort',
    enum: ['DESC', 'ASC'],
    default: 'DESC',
  })
  @IsString()
  @Transform(value => value.toUpperCase())
  @IsEnum(['DESC', 'ASC'])
  readonly order: 'DESC' | 'ASC';

  @ApiModelPropertyOptional({
    description: '名称',
    default: `测试用例名称${Math.random()}`,
  })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiModelPropertyOptional({
    enum: ['true', 'false'],
    default: null,
    description: '是否激活',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(value => {
    if (value === '') {
      return true;
    } else if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    } else {
      return value;
    }
  })
  @IsEnum([true, false, null])
  readonly active: boolean = true;

  @ApiModelPropertyOptional({ description: '详情信息,json对象' })
  @IsOptional()
  @IsString()
  readonly detail: string;

  @ApiModelPropertyOptional({ description: '介绍' })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiModelPropertyOptional({ description: 'tags' })
  @IsOptional()
  @IsString()
  readonly tags: string;

  @ApiModelPropertyOptional({ description: '分类ID' })
  @IsOptional()
  @IsString()
  readonly categoryId: string;
}
