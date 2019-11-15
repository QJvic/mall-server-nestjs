import { Entity } from 'typeorm';
import { CommonImageEntity } from './common/common-image.entity';

@Entity('homeicon')
export class HomeIconEntity extends CommonImageEntity {}
