import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { HashtagEntity } from "./hashtag.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'tweets_twitter' })
export class TweetEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ width: 280 })
    tweet: string;

    @ManyToOne(() => UserEntity, (user) => user.tweets, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    // @ManyToMany(() => HashtagEntity)
    // @JoinTable({ name: 'tweets_hashtags' })
    // hashtags: HashtagEntity[];

    // addHashtags(hashtags: any[]) {
    //     if (this.hashtags == null) {
    //         this.hashtags = new Array<HashtagEntity>();            
    //     }
    //     this.hashtags.push(...hashtags)
    // }

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}