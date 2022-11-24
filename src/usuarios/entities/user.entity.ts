import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// +-------------+--------------+----------------------------+
// |                          users                          |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | name        | varchar(100) |                            |
// | email       | varchar(50)  | UNIQUE                     |
// | active      | boolean      |                            |
// +-------------+--------------+----------------------------+

/* 
Definindo um nome para tabela
obs: caso não seja aplicado o name, será utilizado o nome da entity como nome para tabela.
*/
@Entity({ name: "users" }) 
export class UserEntity {
    // Cria uma coluna primária cujo valor será gerado automaticamente com incremento automático. 
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 100 })
    name: string;
  
    // são definidas as configurações de tamanho máximo do texto e a informação se é deve ser único na tabela.
    @Column({ length: 50, unique: true })
    email: string;

    @Column()
    active: boolean;
}