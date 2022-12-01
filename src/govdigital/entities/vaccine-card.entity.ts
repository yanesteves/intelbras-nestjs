import { CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PersonEntity } from "./person.entity";
import { VaccineEntity } from "./vaccine.entity";

// +-------------+--------------+----------------------------+
// |                     vaccine-card                        |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | person      | *            | 1:1                        |
// | vaccines    | *            | N:N                        |
// | createdAt   | date         |                            |
// | updatedAt   | date         |                            |
// +-------------+--------------+----------------------------+

@Entity({name: 'vaccine-card'})
export class VaccineCardEntity {
    @PrimaryGeneratedColumn()
    id: number;    

    @OneToOne(() => PersonEntity, (person) => person.vaccine_card)
    person: PersonEntity;    

    @ManyToMany(type => VaccineEntity)
    @JoinTable({ name: 'vaccinecard_vaccines'}) // Decorator para N:N e especifica qual o lado é o "dono do relacionamento".
    vaccines: VaccineEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}