import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsBase64,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CategoryFindDto {
  @ApiModelPropertyOptional({ description: 'order', default: 'created' })
  @IsString()
  @IsOptional()
  readonly sort: string;

  @ApiModelPropertyOptional({
    description: 'sort',
    enum: ['DESC', 'ASC'],
    default: 'DESC',
  })
  @IsString()
  @IsOptional()
  @Transform(value => value.toUpperCase())
  @IsEnum(['DESC', 'ASC'])
  readonly order: 'DESC' | 'ASC';
}
