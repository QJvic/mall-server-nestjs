import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  whitelist: true, // 去掉dto中不存在的参数
  forbidUnknownValues: true,
  transformOptions: {
    // class-transform配置
    enableCircularCheck: true, // 开启类型转换
  },
  exceptionFactory(errors) {
    if (errors.length > 0) {
      // 获取第一条错误消息
      throw new BadRequestException(errors);
    }
    return true;
  },
});
