import { Column, Entity, ManyToMany } from 'typeorm';
import { CommonEntity } from './common/common.entity';
import { GoodEntity } from './good.entity';

@Entity('good_tag')
export class GoodTagEntity extends CommonEntity {
  @Column()
  name: string;
}
