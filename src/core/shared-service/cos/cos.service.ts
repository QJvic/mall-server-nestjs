import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Readable } from 'stream';
import {
  UpdateImageInterface,
  UpLoadImageInterface,
} from '../../interfaces/upLoadImage.interface';
import { cosOpt } from '../../../config';
// tslint:disable-next-line:no-var-requires
const COS = require('cos-nodejs-sdk-v5');
// tslint:disable-next-line:no-var-requires
const { promisify } = require('util');
// tslint:disable-next-line:no-var-requires
const sendToWormhole = require('stream-wormhole');
// tslint:disable-next-line:no-var-requires
const uuidv1 = require('uuid/v1');

@Injectable()
export class CosService {
  public cos: any;
  private urlPirx: string;
  constructor() {
    // 腾讯云配置
    const cos = new COS({
      SecretId: cosOpt.SecretId,
      SecretKey: cosOpt.SecretKey,
    });

    // 改成promise
    cos.pPutObject = promisify(cos.putObject);
    cos.pDeleteObject = promisify(cos.deleteObject);

    // 拼接cos对象的链接前缀，以供后面删除
    // 拼接结果如 'https://chengdu-1**237**847.cos.ap-chengdu.myqcloud.com/',
    this.urlPirx = `https://${cosOpt.Bucket}.cos.${cosOpt.Region}.mycloud.com/`;

    this.cos = cos;
  }

  /**
   * 上传图片
   * @param Body
   * @param Key
   */
  async upLoadImage({ stream, base64, path }: Partial<UpLoadImageInterface>) {
    if (!stream) {
      try {
        stream = await this.base2Stream(base64);
      } catch (e) {
        throw new InternalServerErrorException('图片转换为流出现异常', e);
      }
    }
    const uuid = uuidv1();
    const name = `${path}${uuid}.png`;
    try {
      const result = await this.cos.pPutObject({
        Bucket: cosOpt.Bucket,
        Region: cosOpt.Region,
        Key: name,
        Body: stream,
      });
      if (result && result.Location) {
        result.Location = 'https://' + result.Location;
      }
      return result.Location;
    } catch (e) {
      throw new InternalServerErrorException('图片上传cos出现错误', e);
    }
  }

  /**
   * 删除图片
   * @param name
   */
  async deleteImage(name) {
    let result;
    name = name.replace(this.urlPirx, '');
    try {
      result = await this.cos.pDeleteObject({
        Bucket: 'chengdu-1252370847',
        Region: 'ap-chengdu',
        Key: name,
      });
    } catch (e) {
      throw new InternalServerErrorException('删除图片出现错误', e);
    }
    return result;
  }

  /**
   * 更新图片，删除旧的上传新的
   */
  async updateImage(params: Partial<UpdateImageInterface>) {
    const { originName, stream, base64, path } = params;
    const mName = originName.replace(
      'https://chengdu-1252370847.cos.ap-chengdu.myqcloud.com/',
      '',
    );
    await this.deleteImage(mName);
    const result = await this.upLoadImage({ stream, base64, path });
    return result;
  }

  /**
   * base64转流
   * @param base64
   */
  async base2Stream(base64: string) {
    let stream;
    // 删除前缀
    base64 = base64.replace(/^data:image\/\w+;base64,/, '');
    try {
      const imgBuffer = Buffer.from(base64, 'base64');
      stream = new Readable();
      stream.push(imgBuffer);
      stream.push(null);
      return stream;
    } catch (e) {
      if (stream) {
        await sendToWormhole(stream);
      }
      throw new InternalServerErrorException(e.toString());
    }
  }
}
