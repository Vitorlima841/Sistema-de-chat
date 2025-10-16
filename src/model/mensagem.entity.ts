import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
    BaseEntity,
} from 'typeorm';
import {Usuario} from "./usuario.entity";
import {SalaUsuario} from "./salaUsuario.entity";
import {Sala} from "./sala.entity";

@Entity({ name: 'Mensagem' })
export class Mensagem extends BaseEntity {
    constructor(id?: number) {
        super();
        if (id) this.id = id;
    }

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'conteudo' })
    conteudo: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.mensagemsRementente)
    remetente: Usuario;

    @ManyToOne(() => Usuario, (usuario) => usuario.mensagemsDestinatario)
    destinatario: Usuario;

    @ManyToOne(() => Sala, (sala) => sala.mensagems)
    sala: Sala;
}

