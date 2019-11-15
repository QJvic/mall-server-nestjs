import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodEntity } from '../../core/entities/good.entity';
import { Repository } from 'typeorm';
import { GoodTagEntity } from '../../core/entities/good-tag.entity';
import { GoodTagAddDto } from '../../core/dtos/good/good-tag-add.dto';
import { GoodAddDto } from '../../core/dtos/good/good-add.dto';
import { CosService } from '../../core/shared-service/cos/cos.service';
import { GoodImageAddDto } from '../../core/dtos/good/good-image-add.dto';
import { GoodImageEntity } from '../../core/entities/good-image.entity';
import { GoodUpdateDto } from '../../core/dtos/good/good-update.dto';
import { CategoryEntity } from '../../core/entities/category.entity';
import { GoodFindDto } from '../../core/dtos/good/good-find.dto';

@Injectable()
export class GoodService {
  path = 'good';
  constructor(
    @InjectRepository(GoodEntity)
    private readonly goodRepository: Repository<GoodEntity>,
    @InjectRepository(GoodTagEntity)
    private readonly goodTagRepository: Repository<GoodTagEntity>,
    @InjectRepository(GoodImageEntity)
    private readonly goodImageRepository: Repository<GoodImageEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly cosService: CosService,
  ) {}

  async test() {
    const entity = this.goodRepository.create();
  }

  /**
   * 获取所有tags
   */
  async findTags() {
    const entities = await this.goodTagRepository.findAndCount();
    const result = { entities, page: -1, limit: -1 };
    return result;
  }

  /**
   * 新增tags
   * @param params
   */
  async addTags(params: GoodTagAddDto) {
    const entity = new GoodTagEntity();
    entity.name = params.name;
    const result = await this.goodTagRepository.save(entity);
    return result;
  }

  /**
   * 删除tag
   * @param id
   */
  async deleteTags(id: string) {
    const entity = await this.goodTagRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有该分类');
    }
    const result = await this.goodTagRepository.remove(entity);
    return result;
  }

  /**
   * 新增商品文字
   */
  async addGood(params: GoodAddDto) {
    const {
      name,
      order,
      image,
      link,
      active,
      detail,
      description,
      tags,
      categoryId,
    } = params;
    let result;
    let imageUrl;
    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('没有该分类');
    }

    if (image) {
      imageUrl = await this.cosService.upLoadImage({
        base64: image,
        path: this.path,
      });
    }
    const entity = new GoodEntity();
    entity.name = name;
    entity.order = order;
    entity.image = imageUrl;
    entity.link = link;
    entity.active = active;
    entity.detail = detail;
    entity.description = description;
    entity.tags = tags;
    entity.category = category;
    result = await this.goodRepository.save(entity);
    return result;
  }

  /**
   * 更新商品文字
   */
  async update(id: string, params: GoodUpdateDto) {
    let result;
    let imageUrl;
    const {
      name,
      order,
      image,
      link,
      active,
      detail,
      description,
      tags,
      categoryId,
    } = params;
    const entity = await this.goodRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有该商品');
    }
    const categoryEntity = await this.categoryRepository.findOne(categoryId);
    if (!categoryEntity) {
      throw new NotFoundException('没有该分类');
    }
    if (image) {
      imageUrl = await this.cosService.updateImage({
        originName: entity.image,
        base64: image,
        path: this.path,
      });
    }
    entity.description = description;
    entity.detail = detail;
    entity.category = categoryEntity;
    entity.name = name;
    entity.order = order;
    entity.link = link;
    entity.active = active;
    entity.image = imageUrl;
    entity.tags = tags;
    result = await this.categoryRepository.save(entity);
    return result;
  }

  /**
   * 新增商品图片
   */
  async addGoodImage(params: GoodImageAddDto) {
    const { name, id, image, type } = params;
    let result;
    let entity;
    let path = this.path;
    const good = this.goodRepository.findOne(id);
    if (!good) {
      throw new NotFoundException('没有该商品');
    }
    if (type === 'swipe') {
      path = path + '/swipe';
    } else {
      path = path + '/detail';
    }
    const imageUrl = await this.cosService.upLoadImage({ base64: image, path });
    entity = new GoodImageEntity();
    entity.name = name;
    entity.good = good;
    entity.type = type;
    entity.image = imageUrl;
    result = await this.goodImageRepository.save(entity);
    return result;
  }

  /**
   * 删除商品
   * @param id
   */
  async delete(id: string) {
    const entity = await this.goodRepository.findOne(id);
    let result = {};
    if (!entity) {
      throw new NotFoundException('没有该商品');
    }
    const mResult = await this.goodRepository.remove(entity);
    const subEntities = await this.goodImageRepository.find({
      where: { goodId: id },
    });
    const mSubResult = await this.goodImageRepository.remove(subEntities);
    result = { result: mResult, subResult: mSubResult };
    return result;
  }

  /**
   * 删除商品图片
   * @param id
   */
  async deleteGoodImage(id: string) {
    let result;
    const entity = await this.goodImageRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有该图片');
    }
    result = await this.goodImageRepository.remove(entity);
    return result;
  }

  /**
   * 查找商品,不包含具体图片
   * @param params
   */
  async findGoods(params: GoodFindDto) {
    let result;
    const {
      page,
      limit,
      sort,
      order,
      name,
      active,
      detail,
      description,
      tags,
      categoryId,
    } = params;
    const queryBuilder = this.goodRepository
      .createQueryBuilder('t')
      .where('1=1');
    if (name) {
      queryBuilder.andWhere('t.name like :name', { name });
    }
    if (active) {
      queryBuilder.andWhere('t.active = :active', { active });
    }
    if (detail) {
      queryBuilder.andWhere('t.detail like :detail', { detail });
    }
    if (description) {
      queryBuilder.andWhere('t.description like :description', { description });
    }
    if (tags) {
      queryBuilder.andWhere('t.tags like :tags', { tags });
    }
    if (categoryId) {
      queryBuilder.andWhere('t.categoryId = :categoryId', { categoryId });
    }
    queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy(sort, order);
    const entities = await queryBuilder.getManyAndCount();
    result = { entities, page, limit };
    return result;
  }

  /**
   * 获取商品图
   * @param id
   */
  async findGoodImage(id: string) {
    let result;
    const swipeImages = [];
    const detailImages = [];
    const good = await this.goodRepository.findOne(id);
    if (!good) {
      throw new NotFoundException('没有该商品');
    }
    const entities = await this.goodImageRepository.find({
      where: { goodId: id },
      order: { id: 'ASC' },
    });
    entities.forEach(entity => {
      if (entity.type === 'swipe') {
        swipeImages.push(entity);
      } else {
        detailImages.push(entity);
      }
    });
    result = { swipeImages, detailImages };
    return result;
  }
}
