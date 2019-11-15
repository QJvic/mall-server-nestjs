import { CommonEntity } from './common.entity';
import { Column } from 'typeorm';

export class CommonImageEntity extends CommonEntity {
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
