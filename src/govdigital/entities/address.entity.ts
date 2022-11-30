import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PersonEntity } from "./person.entity";

// +-------------+--------------+----------------------------+
// |                       adresses                          |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | street      | varchar(100) |                            |
// | number      | int          |                            |
// | district    | varchar(30)  |                            |
// | city        | varchar(50)  |                            |
// | state       | varchar(2)   |                            |
// | country     | varchar(2)   |                            |
// | zip         | varchar(10)  |                            |
// | createdAt   | date         |                            |
// | updatedAt   | date         |                            |
// +-------------+--------------+----------------------------+

@Entity({name: 'adresses'})
export class AddressEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ width: 100 })
    street: string;

    @Column({ type: 'int'})
    number: string;

    @Column({ width: 30 })
    district: string;    

    @Column({ width: 50 })
    city: string;    
        
    @Column({ width: 2 })
    state: string;

    @Column({ width: 2 })
    country: string;

    @Column({ width: 10 })
    zip: string;

    // AddressEntity tem uma relação mutios para um com a entidade PersonEntity
    @ManyToOne(() => PersonEntity, (person) => person.addresses, { onDelete: 'SET NULL'})
    @JoinColumn({ name: 'person_id' }) // opcional para OneToMany
    person: PersonEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}