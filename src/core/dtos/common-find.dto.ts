import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CommonFindDto {
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
  @IsEnum(['DESC', 'ASC'])
  readonly order: 'DESC' | 'ASC';

  // //// 以上为通用查询参数
}
