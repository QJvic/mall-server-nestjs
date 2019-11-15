/**
 * 带有图片的entity，继承基础的，并添加名称、顺序、连接、激活、图片
 */
import { CommonEntity } from './common.entity';
import { Column } from 'typeorm';

export class CommonPicEntity extends CommonEntity {
  @Column({ nullable: true })
  order: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  link: string;

  @Column()
  active: boolean;
}
