import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CosService } from '../../core/shared-service/cos/cos.service';
import { HomeIconEntity } from '../../core/entities/home-icon.entity';
import { UpLoadImageInterface } from '../../core/interfaces/upLoadImage.interface';
import { HomeIconUpdateDto } from '../../core/dtos/home-icon/home-icon-update.dto';
import { HomeIconCreateDto } from '../../core/dtos/home-icon/home-icon-create.dto';
import { HomeIconFindDto } from '../../core/dtos/home-icon/home-icon-find.dto';

@Injectable()
export class HomeIconService {
  private readonly path = 'homeswipe/';
  constructor(
    @InjectRepository(HomeIconEntity)
    private readonly HomeIconRepository: Repository<HomeIconEntity>,
    private readonly cosService: CosService,
  ) {}

  /**
   * 查询
   * @param params
   */
  async find(params: HomeIconFindDto) {
    const { page, limit, order, sort, name, active } = params;
    const queryBuilder = this.HomeIconRepository.createQueryBuilder('t') // 简称t
      .where('1=1');
    if (active !== null) {
      queryBuilder.andWhere('t.active = :active', { active });
    }
    if (name && name !== '') {
      queryBuilder.andWhere('t.name like :name', { name });
    }
    queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy(sort, order);

    const entities = await queryBuilder.getManyAndCount();
    const result = { entities, page, limit };
    return result;
  }

  /**
   * 创建
   */
  async add(params: HomeIconCreateDto) {
    const { name, order, image, link, active } = params;
    const upLoadImageOptions: Partial<UpLoadImageInterface> = {
      path: this.path,
      base64: image,
    };
    const imageUrl = await this.cosService.upLoadImage(upLoadImageOptions);
    const homeswipe = new HomeIconEntity();
    homeswipe.name = name;
    homeswipe.order = order;
    homeswipe.image = imageUrl;
    homeswipe.link = link;
    homeswipe.active = active;
    const SQLresult = await this.HomeIconRepository.save(homeswipe);
    return SQLresult;
  }

  /**
   * 删除
   */
  async delete(id: string | number) {
    const entity = await this.HomeIconRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有该图标');
    }
    const subResult = await this.cosService.deleteImage(entity.image);
    const result = await this.HomeIconRepository.remove(entity);
    return { result, subResult };
  }

  async update(id: string, params: HomeIconUpdateDto) {
    const entity = await this.HomeIconRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有图标');
    }
    if (params.image) {
      const uploadOptions: Partial<UpLoadImageInterface> = {
        base64: params.image,
        path: this.path,
      };
      // 上传新图片
      const imageResult = await this.cosService.upLoadImage(uploadOptions);
      // 删除旧图片
      await this.cosService.deleteImage(entity.image);
    }
    Object.keys(params).forEach(key => {
      if (params[key]) {
        entity[key] = params[key];
      }
    });
    const result = await this.HomeIconRepository.save(entity);
    return result;
  }
}
