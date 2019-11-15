import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CommonImageEntity } from './common/common-image.entity';
import { GoodTagEntity } from './good-tag.entity';
import { GoodImageEntity } from './good-image.entity';
import { CategoryEntity } from './category.entity';

@Entity('good')
export class GoodEntity extends CommonImageEntity {
  @Column()
  detail: string;

  @Column({ default: 9999 })
  price: number;

  @Column({ nullable: true, default: 1 })
  count: number;

  @Column({ nullable: true })
  tags: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(type => GoodImageEntity, goodImage => goodImage.image)
  images: GoodImageEntity[];

  @ManyToOne(type => CategoryEntity, categoty => categoty.goods, {
    nullable: true,
  })
  category: CategoryEntity;
}
