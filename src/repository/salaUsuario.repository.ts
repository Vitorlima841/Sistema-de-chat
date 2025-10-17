import { Injectable } from '@nestjs/common';
import { SalaUsuario } from 'src/model/salaUsuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sala } from 'src/model/sala.entity';
import { Usuario } from 'src/model/usuario.entity';

@Injectable()
export class SalaUsuarioRepository {
  
  constructor(
    @InjectRepository(SalaUsuario)
    private readonly repository: Repository<SalaUsuario>,
  ) {}

  async findOne(options: any) {
    return this.repository.findOne(options);
  }

  create(data: Partial<SalaUsuario>) {
    return this.repository.create(data);
  }

  async save(relacao: SalaUsuario) {
    return this.repository.save(relacao);
  }

  async remove(relacao: SalaUsuario) {
    return this.repository.remove(relacao);
  }

  async listarUsuariosDaSala(idSala: number) {
    return this.repository.find({
      where: { sala: { id: idSala } },
      relations: ['usuario'],
    });
  }

  async listarSalasDoUsuario(idUsuario: number) {
    return this.repository.find({
      where: { usuario: { id: idUsuario } },
      relations: ['sala'],
    });
  }

  async adicionarUsuarioNaSala(sala: Sala, usuario: Usuario) {
    const relacao = this.repository.create({ sala, usuario });
    return this.repository.save(relacao);
  }

  async removerUsuarioDaSala(idSala: number, idUsuario: number) {
    const relacao = await this.repository.findOne({
      where: { sala: { id: idSala }, usuario: { id: idUsuario } },
      relations: ['usuario', 'sala'],
    });

    if (relacao) {
      await this.repository.remove(relacao);
      return relacao;
    }
    return null;
  }
}
