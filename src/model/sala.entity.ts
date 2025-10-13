import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    BaseEntity,
} from 'typeorm';
import {SalaUsuario} from "./salaUsuario";
import {TipoSala} from "../shared/enums/TipoSala.enum";
import {Mensagem} from "./mensagem.entity";

@Entity({ name: 'sala' })
export class Sala extends BaseEntity {
    constructor(id?: number) {
        super();
        if (id) this.id = id;
    }

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'nome' })
    nome: string;

    @Column({ name: 'descricao' })
    descricao: string;

    @Column({ name: 'tipo' })
    tipoSala: TipoSala;

    @OneToMany(() => SalaUsuario, (salaUsuario) => salaUsuario.sala)
    participantes: SalaUsuario[];

    @OneToMany(() => Mensagem, (mensagem) => mensagem.sala)
    mensagemsSala: Mensagem[];

    //todo verificar se precisa criar o campo "ativo"
}
