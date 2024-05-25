import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OAuthEnum } from '../../../common/enums/oauth.enum';
import { URLEntity } from '../../urls/entities/urls.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true, select: false })
  password?: string;

  @Column({ type: 'enum', enum: OAuthEnum })
  provider!: OAuthEnum;

  @Column({ nullable: true, select: false })
  email_verified: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => URLEntity, (urlEntity) => urlEntity.user, {
    onDelete: 'CASCADE',
  })
  urls: URLEntity[];
}
