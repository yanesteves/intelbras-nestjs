import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { TweetEntity } from "./tweet.entity";

@Entity({ name: 'users_twitter' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 30 })
    username: string;

    @Column({ length: 300, nullable: true })
    bio: string;

    @Column({ length: 100 })
    name: string;

    @Column({ default: false })
    privateAccount: boolean;
  
    @Column({ length: 50, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    salt: string;
    
    @OneToMany(() => TweetEntity, (tweet) => tweet.user, { cascade: true })
    tweets: TweetEntity[]

    addTweet(tweet: any) {
        if (this.tweets == null) {
            this.tweets = new Array<TweetEntity>();
        }
        this.tweets.push(tweet);
    }    

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    async checkPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password;
    }
}