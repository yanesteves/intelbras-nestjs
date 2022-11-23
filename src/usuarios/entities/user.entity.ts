import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" }) // definindo um nome para tabela
export class UserEntity {
    // Cria uma coluna primária cujo valor será gerado automaticamente com um valor de incremento automático. 
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