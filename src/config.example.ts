// swagger使用的默认上传图片
export const defaultBase64PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAF0lEQVQoFWNkWHTlPwMOwIRDHCw8UiQBzWICiYYCHREAAAAASUVORK5CYII=';

// 数据库配置
export const mysql = {
  host: 'your mysql host here',
  port: 'your mysql port here', // Number type 数字类型而不是字符串
  username: 'your mysql username here',
  password: 'your mysql password here',
  database: 'your mysql database here',
};

// 腾讯云对象存储cos设置
export const cosOpt = {
  // 存储桶设置
  Bucket: '****-****',
  Region: 'ap-******',
  // 密钥设置
  SecretId: '*****',
  SecretKey: '*****',
};
