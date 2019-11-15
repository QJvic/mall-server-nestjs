import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsBooleanString,
  IsDefined,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { defaultBase64PNG } from '../../../config';
import { Transform } from 'class-transformer';

/**
 * 查询dto
 */
export class HomeIconFindDto {
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

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiModelPropertyOptional({
    enum: ['true', 'false'],
    default: null,
    description: '是否激活',
  })
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
  @IsOptional()
  @IsEnum([true, false, null])
  readonly active: boolean = true;
}
