import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DriverLicenseEntity } from "./driver-license.entity";

// +-------------+--------------+----------------------------+
// |                        persons                          |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | name        | varchar(100) |                            |
// | date        | date         |                            |
// | cpf         | varchar(14)  |                            |
// | rg          | varchar(14)  |                            |
// | driver      | int(11)      | FOREIGN KEY                |
// +-------------+--------------+----------------------------+

@Entity('persons')
export class PersonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @OneToOne(
        // Especifico qual o tipo da coluna
        type => DriverLicenseEntity,
        (driver) => driver.person,        
        { cascade: true })
    // Esta coluna é a que irá reter a informação da relação com o nome driver_id
    @JoinColumn({ name: 'driver_id' }) 
    driver: DriverLicenseEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}