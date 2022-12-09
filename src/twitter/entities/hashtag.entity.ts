import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'hashtags_twitter' })
export class HashtagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hashtag: string;

}