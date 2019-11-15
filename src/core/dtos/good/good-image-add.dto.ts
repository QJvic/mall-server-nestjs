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

export class GoodImageAddDto {
  @ApiModelPropertyOptional({
    description: '名称',
    default: `测试用例名称${Math.random()}`,
  })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiModelPropertyOptional({
    description: '商品id',
  })
  @IsNumber()
  readonly id: number;

  @ApiModelProperty({ description: '图片base64' })
  @Transform(value => splitBase64(value))
  @IsBase64()
  readonly image: string;

  @ApiModelProperty({ description: '图片类型', default: 'swipe' })
  @IsString()
  @IsEnum(['swipe', 'detail'])
  readonly type: 'swipe' | 'detail';
}
