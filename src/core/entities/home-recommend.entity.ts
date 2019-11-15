import { Entity } from 'typeorm';
import { CommonImageEntity } from './common/common-image.entity';

@Entity('homerecommend')
export class HomeRecommendEntity extends CommonImageEntity {}
