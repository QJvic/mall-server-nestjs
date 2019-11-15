import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CosService } from '../../core/shared-service/cos/cos.service';
import { HomeRecommendEntity } from '../../core/entities/home-recommend.entity';
import { HomeRecommendFindDto } from '../../core/dtos/home-recommend/home-recommend-find.dto';
import { HomeRecommendUpdateDto } from '../../core/dtos/home-recommend/home-recommend-update.dto';
import { UpLoadImageInterface } from '../../core/interfaces/upLoadImage.interface';
import { HomeRecommendCreateDto } from '../../core/dtos/home-recommend/home-recommend-create.dto';

@Injectable()
export class HomeRecommendService {
  private readonly path = 'homerecommend/';
  constructor(
    @InjectRepository(HomeRecommendEntity)
    private readonly homeRecommendRepository: Repository<HomeRecommendEntity>,
    private readonly cosService: CosService,
  ) {}

  /**
   * 查询
   * @param params
   */
  async find(params: HomeRecommendFindDto) {
    const { page, limit, order, sort, name, active } = params;
    const queryBuilder = this.homeRecommendRepository
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
  async add(params: HomeRecommendCreateDto) {
    const { name, order, image, link, active } = params;
    const upLoadImageOptions: Partial<UpLoadImageInterface> = {
      path: this.path,
      base64: image,
    };
    const imageUrl = await this.cosService.upLoadImage(upLoadImageOptions);
    const homeswipe = new HomeRecommendEntity();
    homeswipe.name = name;
    homeswipe.order = order;
    homeswipe.image = imageUrl;
    homeswipe.link = link;
    homeswipe.active = active;
    const SQLresult = await this.homeRecommendRepository.save(homeswipe);
    return SQLresult;
  }

  /**
   * 删除
   */
  async delete(id: string | number) {
    const entity = await this.homeRecommendRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有该推荐图');
    }
    const subResult = await this.cosService.deleteImage(entity.image);
    const result = await this.homeRecommendRepository.remove(entity);
    return { result, subResult };
  }

  async update(id: string, params: HomeRecommendUpdateDto) {
    const entity = await this.homeRecommendRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有该推荐图');
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
    const result = await this.homeRecommendRepository.save(entity);
    return result;
  }
}
