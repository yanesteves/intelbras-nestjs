import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// +-------------+--------------+----------------------------+
// |                        vaccine                          |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | name        | varchar(100) |                            |
// | laboratory  | varchar(50)  |                            |
// | createdAt   | date         |                            |
// | updatedAt   | date         |                            |
// +-------------+--------------+----------------------------+

@Entity({ name: 'vaccines'})
export class VaccineEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    laboratory: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}