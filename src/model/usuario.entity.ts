import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import {SalaUsuarioEnity} from "./salaUsuario.enity";
import {Mensagem} from "./mensagem.entity";

@Entity({ name: 'usuario' })
export class Usuario extends BaseEntity {
  constructor(id?: number) {
    super();
    if (id) this.id = id;
  }
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'login' })
  login: string;

  @Column({ name: 'senha' })
  senha: string;

  @OneToMany(() => SalaUsuarioEnity, (salaUsuario) => salaUsuario.usuario)
  salasParticipantes: SalaUsuarioEnity[];

  @OneToMany(() => Mensagem, (mensagem) => mensagem.remetente)
  mensagemsRementente: Mensagem[];

  @OneToMany(() => Mensagem, (mensagem) => mensagem.destinatario)
  mensagemsDestinatario: Mensagem[];
}
