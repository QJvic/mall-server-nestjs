import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from './common/common.entity';
import { GoodEntity } from './good.entity';

@Entity('category')
export class CategoryEntity extends CommonEntity {
  @Column({ nullable: true })
  order: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  link: string;

  @Column()
  active: boolean;

  @Column({ default: 0 })
  pid: number;

  @OneToMany(type => GoodEntity, good => good.category)
  goods: GoodEntity[];
}
