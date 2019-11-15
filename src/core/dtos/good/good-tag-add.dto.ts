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

export class GoodTagAddDto {
  @ApiModelPropertyOptional({
    description: '名称',
    default: `测试用例名称${Math.random()}`,
  })
  @IsString()
  readonly name: string;
}
