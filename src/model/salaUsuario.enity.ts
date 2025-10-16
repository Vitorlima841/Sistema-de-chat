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

@Entity('sala_usuario')
export class SalaUsuarioEnity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'papel' })
    papel: TipoUsuario;

    @ManyToOne(() => Usuario, (usuario) => usuario.salasParticipantes)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => Sala, (sala) => sala.participantes)
    @JoinColumn({ name: 'sala_id' })
    sala: Sala;
}
