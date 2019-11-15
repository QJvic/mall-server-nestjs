import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from './common/common.entity';
import { GoodEntity } from './good.entity';

@Entity('good_image')
export class GoodImageEntity extends CommonEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  order: number;

  @Column()
  image: string;

  @ManyToOne(type => GoodEntity, good => good.images)
  good: GoodEntity;

  @Column()
  type: 'swipe' | 'detial';
}
