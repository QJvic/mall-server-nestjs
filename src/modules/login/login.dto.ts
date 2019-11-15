import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiModelProperty({ description: '用户名' })
  readonly name: string;

  @ApiModelProperty({ description: '密码' })
  readonly password: string;
}
