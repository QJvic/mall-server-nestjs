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
import { defaultBase64PNG } from '../../../config';
import { splitBase64 } from '../../../utils/common';

export class HomeRecommendUpdateDto {
  @ApiModelPropertyOptional({
    description: '名称',
    default: `测试用例名称${Math.random()}`,
  })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiModelPropertyOptional({ description: '顺序', default: 1 })
  @IsNumber()
  @Transform(value => Number(value))
  @IsOptional()
  readonly order: number;

  @ApiModelProperty({ description: '图片base64', default: defaultBase64PNG })
  @Transform(value => splitBase64(value))
  @IsBase64()
  @IsOptional()
  readonly image: string;

  @ApiModelPropertyOptional({ description: '跳转链接' })
  @IsString()
  @IsOptional()
  readonly link: string;

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
}
