import { Injectable, NotFoundException } from '@nestjs/common';
import { HomeSwipeEntity } from '../../core/entities/home-swipe.entity';
import { HomeSwipeFindDto } from '../../core/dtos/home-swipe/home-swipe-find.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeSwipeCreateDto } from '../../core/dtos/home-swipe/home-swipe-create.dto';
import { CosService } from '../../core/shared-service/cos/cos.service';
import { UpLoadImageInterface } from '../../core/interfaces/upLoadImage.interface';
import { HomeSwipeUpdateDto } from '../../core/dtos/home-swipe/home-swipe-update.dto';

@Injectable()
export class HomeSwipeService {
  private readonly path = 'homeswipe/';
  constructor(
    @InjectRepository(HomeSwipeEntity)
    private readonly homeSwipeRepository: Repository<HomeSwipeEntity>,
    private readonly cosService: CosService,
  ) {}

  /**
   * 查询
   * @param params
   */
  async find(params: HomeSwipeFindDto) {
    const { page, limit, order, sort, name, active } = params;
    const queryBuilder = this.homeSwipeRepository
      .createQueryBuilder('hs') // 简称hs
      .where('1=1');
    if (active !== null) {
      queryBuilder.andWhere('hs.active = :active', { active });
    }
    if (name && name !== '') {
      queryBuilder.andWhere('hs.name like :name', { name });
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
  async add(params: HomeSwipeCreateDto) {
    const { name, order, image, link, active } = params;
    const upLoadImageOptions: Partial<UpLoadImageInterface> = {
      path: this.path,
      base64: image,
    };
    const upLoadImageResult = await this.cosService.upLoadImage(
      upLoadImageOptions,
    );
    const imageUrl = upLoadImageResult;
    const homeswipe = new HomeSwipeEntity();
    homeswipe.name = name;
    homeswipe.order = order;
    homeswipe.image = imageUrl;
    homeswipe.link = link;
    homeswipe.active = active;
    const SQLresult = await this.homeSwipeRepository.save(homeswipe);
    return SQLresult;
  }

  /**
   * 删除
   */
  async delete(id: string | number) {
    const entity = await this.homeSwipeRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有该轮播图');
    }
    const subResult = await this.cosService.deleteImage(entity.image);
    const result = await this.homeSwipeRepository.remove(entity);
    return { result, subResult };
  }

  /**
   * 更新
   * @param id
   * @param params
   */
  async update(id: string, params: HomeSwipeUpdateDto) {
    let imageResult;
    const entity = await this.homeSwipeRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有该轮播图');
    }
    if (params.image) {
      const uploadOptions: Partial<UpLoadImageInterface> = {
        base64: params.image,
        path: this.path,
      };
      imageResult = await this.cosService.updateImage({
        base64: params.image,
        path: this.path,
        originName: entity.image,
      });
    }
    Object.keys(params).forEach(key => {
      if (params[key]) {
        entity[key] = params[key];
      }
    });
    if (imageResult) {
      entity.image = imageResult;
    }
    const result = await this.homeSwipeRepository.save(entity);
    return result;
  }
}
