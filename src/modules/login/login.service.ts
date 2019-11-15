import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './login.dto';
import { JwtPayLoad } from './login.interface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtSerice: JwtService,
  ) {}

  /**
   * 登陆
   * @param data
   */
  async login(data: LoginDto) {
    const { name, password } = data;
    const entity = await this.userService.findByName(name);
    if (!entity) {
      throw new NotFoundException('没有该用户');
    }
    if (!(await entity.comparePassword(password))) {
      throw new UnauthorizedException('密码不正确');
    }

    const { id } = entity;
    const payload = { id, name };
    const token = this.signToken(payload);
    return {
      ...payload,
      token,
    };
  }

  signToken(data: JwtPayLoad) {
    return this.jwtSerice.sign(data);
  }
}
