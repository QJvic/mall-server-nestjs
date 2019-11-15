import { Entity } from 'typeorm';
import { CommonImageEntity } from './common/common-image.entity';

@Entity('homeswipe')
export class HomeSwipeEntity extends CommonImageEntity {}
