import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: string;
    
    @Column({ length: 50 })
    name: string;

    @Column({ length: 30, unique: true })
    email: string;

    // @Column({ nullable: false, length: 20 })
    // role: string;
    
    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    salt: string;

    @Column({ default: true })
    status: boolean;

    @Column({ type: 'varchar', length: 64 })
    confirmationToken: string;

    @Column({ type: 'varchar', length: 64 })
    recoverToken: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    async checkPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password;
    }
}