import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TweetEntity } from './tweet.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, name: 'name' })
  nome: string;

  @Column({ length: 50 })
  usuario: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column()
  password: string

  @Column()
  salt: string

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => TweetEntity, (tweets) => tweets.user)
  tweets: TweetEntity[];

  addTweet(tweet: TweetEntity) {
    if (this.tweets == null) {
      this.tweets = new Array<TweetEntity>();
    }
    this.tweets.push(tweet);
  }

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password;
}
}
