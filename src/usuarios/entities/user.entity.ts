import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
// +-------------+--------------+----------------------------+
// |                          users                          |
// +-------------+--------------+----------------------------+
// | id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
// | name        | varchar(100) |                            |
// | email       | varchar(50)  | UNIQUE                     |
// | active      | boolean      |                            |
// | password    | varchar      |                            |
// | salt        | varchar      |                            |
// | createdAt   | Date         |                            |
// | updatedAt   | Date         |                            |
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

    // @Column({ nullable: false, length: 20 })
    // role: string;
    
    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    salt: string; // Para definir um padrão para o HASH da senha

    @Column()
    active: boolean;

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