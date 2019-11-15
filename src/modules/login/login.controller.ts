import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './login.dto';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorators/user.decorator';

@Controller('login')
@ApiUseTags('登陆')
@ApiBearerAuth()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiOperation({ title: '登陆' })
  async login(@Body() data: LoginDto) {
    return await this.loginService.login(data);
  }

  @Get('test')
  @UseGuards(AuthGuard())
  @ApiOperation({ title: '测试身份验证' })
  async authTest(@User() user) {
    return user;
  }
}
