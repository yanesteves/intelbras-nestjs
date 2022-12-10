import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

// "userId está seguindo followingId"
@Entity({ name: 'relationship' })
export class RelationshipEntity {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  userId: number; // id do usuário

  @Column()
  followingId: number; // id de quem está seguindo

  @CreateDateColumn()
  createdAt: Date;

}