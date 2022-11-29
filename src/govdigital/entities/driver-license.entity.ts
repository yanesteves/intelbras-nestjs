import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { PersonEntity } from "./person.entity";
// import { PersonEntity } from "./person.entity";

// +-------------+--------------+----------------------------+
// |                        persons                          |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | validity    | date         |                            |
// | registry    | varchar(10)  |                            |
// | category    | varchar(5)   |                            |
// | first_lic   | date         |                            |
// +-------------+--------------+----------------------------+

@Entity('driver_licenses')
export class DriverLicenseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 10 })
    registry: string;

    @Column({ length: 5 })
    category: string;

    // Defino um tipo para a relação.
    @OneToOne(() => PersonEntity,
    // Informo como DriverLicense é reconhecido na outra entidade.
    (person) => person.driver)
    person: PersonEntity;

    @Column({ default: false })
    block: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}