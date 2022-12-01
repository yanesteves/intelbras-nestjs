import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AddressEntity } from "./address.entity";
import { DriverLicenseEntity } from "./driver-license.entity";
import { VaccineCardEntity } from "./vaccine-card.entity";

// +-------------+--------------+----------------------------+
// |                        persons                          |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | name        | varchar(100) |                            |
// | date        | date         |                            |
// | cpf         | varchar(14)  |                            |
// | rg          | varchar(14)  |                            |
// | driver      | int(11)      | FOREIGN KEY                |
// | createdAt   | date         |                            |
// | updatedAt   | date         |                            |
// +-------------+--------------+----------------------------+

@Entity({ name: 'persons' })
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

    // PersonEntity tem uma relação um para muitos com a entidade AddressEntity
    @OneToMany(() => AddressEntity, (addresses) => addresses.person, { cascade: true })
    addresses: AddressEntity[]

    addAddress(address: AddressEntity) {
        if (this.addresses == null) {
            this.addresses = new Array<AddressEntity>();
        }
        this.addresses.push(address);
    }    

    @OneToOne(() => VaccineCardEntity, (vaccineCard) => vaccineCard.person ,{ cascade: true })
    @JoinColumn({ name: 'vaccine_card_id' })
    vaccine_card: VaccineCardEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}