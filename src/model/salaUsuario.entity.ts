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

    @ManyToOne(() => Usuario, (usuario) => usuario.salasParticipantes)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => Sala, (sala) => sala.participantes)
    @JoinColumn({ name: 'sala_id' })
    sala: Sala;
}
