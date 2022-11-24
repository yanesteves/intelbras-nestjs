import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CategoriaProduto } from "../utils/CategoriaProduto.enum";

// +-------------+--------------+----------------------------+
// |                        products                         |
// +-------------+--------------+----------------------------+
// | id          | uuid         | PRIMARY KEY                |
// | code        | string       | AUTO UUID                  |
// | name        | varchar(100) |                            |
// | category    | enum         | segurança|redes|acesso     |
// | price       | number       |                            |
// | stock       | number       |                            |
// +-------------+--------------+----------------------------+

@Entity({ name: "products" })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ length: 100 })
    name: string;
    
    @Column()
    code: string;

    @Column('int')
    category: CategoriaProduto;

    @Column('float')
    price: number;

    @Column('int')
    stock: number;
}