import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import {SalaUsuario} from "./salaUsuario.entity";
import {Mensagem} from "./mensagem.entity";

@Entity({ name: 'Usuario' })
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

  @OneToMany(() => SalaUsuario, (salaUsuario) => salaUsuario.usuario)
  salasParticipantes: SalaUsuario[];

  @OneToMany(() => Mensagem, (mensagem) => mensagem.remetente)
  mensagemsRementente: Mensagem[];

  @OneToMany(() => Mensagem, (mensagem) => mensagem.destinatario)
  mensagemsDestinatario: Mensagem[];
}
