import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../core/entities/category.entity';
import { getManager, Repository } from 'typeorm';
import { CosService } from '../../core/shared-service/cos/cos.service';
import { table2tree } from '../../utils/common';
import { CategoryAddDto } from '../../core/dtos/category/category-add.dto';
import { CategoryFindDto } from '../../core/dtos/category/category-find.dto';
import { CategoryUpdateDto } from '../../core/dtos/category/category-update.dto';

@Injectable()
export class CategoryService {
  private readonly path = 'category';
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly cosService: CosService,
  ) {}

  /**
   * 查
   */
  async find(params: CategoryFindDto) {
    const options = {};
    if (params.order && params.sort) {
      let hasColumn = false;
      // 判断下有没有这个列
      const columns = this.categoryRepository.metadata.ownColumns.map(
        column => {
          if (column.propertyName === params.sort) {
            hasColumn = true;
          }
          return column.propertyName;
        },
      );
      if (hasColumn) {
        options[params.sort] = params.order;
      } else {
        throw new NotFoundException('没有该列');
      }
    }

    const result = await this.categoryRepository.find({ order: options });
    const newResult = table2tree(result, 'id', 'pid');
    return newResult;
  }

  /**
   * 增
   */
  async add(params: CategoryAddDto) {
    const { pid, name, order, image, link, active } = params;
    let imageUrl;
    // pid为0，父节点；pid为其他值，子节点
    if (pid !== 0) {
      // 判断该子节点的父节点存不存在
      const pNode = this.categoryRepository.findOne({ id: pid });
      if (!pNode) {
        throw new NotFoundException('该父节点不存在');
      }
    }
    if (image) {
      imageUrl = await this.cosService.upLoadImage({
        base64: image,
        path: this.path,
      });
    }
    const entity = new CategoryEntity();
    entity.pid = pid;
    entity.name = name;
    entity.order = order;
    entity.link = link;
    entity.active = active;
    entity.image = imageUrl;
    const result = await this.categoryRepository.save(entity);
    return result;
  }

  /**
   * 改
   */
  async update(id: string, body: CategoryUpdateDto) {
    let result;
    let imageUrl;
    const { name, order, image, link, active, pid } = body;
    const entity = await this.categoryRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有该分类');
    }
    if (image) {
      imageUrl = await this.cosService.upLoadImage({
        base64: image,
        path: this.path,
      });
      await this.cosService.deleteImage(entity.image);
    }
    entity.name = name;
    entity.order = order;
    entity.image = imageUrl;
    entity.link = link;
    entity.active = active;
    entity.pid = pid;
    result = await this.categoryRepository.save(entity);
    return result;
  }

  /**
   * 刪
   */
  async delete(id: string) {
    let result;
    let subResult;
    const entity = await this.categoryRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有该分类');
    }
    const pid = entity.pid;
    // 如果pid不为0，说明是子节点，直接删除,否则是父节点，删除下面所有的子节点
    if (pid === 0) {
      // todo:应该使用事务
      const subEntities = await this.categoryRepository.find({
        where: { pid: id },
      });
      subResult = await this.categoryRepository.remove(subEntities);
    }
    // 删除本身节点
    result = await this.categoryRepository.remove(entity);
    if (subResult) {
      result.subResult = subResult;
    }
    return result;
  }
}
