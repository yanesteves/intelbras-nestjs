import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'tweets' })
export class TweetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 280 })
  tweet: string;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.tweets, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
