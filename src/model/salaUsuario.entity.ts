import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Unique,
    JoinColumn, BaseEntity,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Sala } from './sala.entity';
import {TipoUsuario} from "../shared/enums/TipoUsuario";

@Entity('Sala_usuario')
export class SalaUsuario extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'cargo' })
    cargo: TipoUsuario;

    @Column({ name: 'fk_enlace' })
    sala: number;

    @Column({ name: 'fk_contrato_aditivo' })
    usuario: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.salasParticipantes)
    @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id'  })
    usuarios: Usuario[];

    @ManyToOne(() => Sala, (sala) => sala.participantes)
    @JoinColumn({ name: 'sala_id', referencedColumnName: 'id'  })
    salas: Sala[];
}
