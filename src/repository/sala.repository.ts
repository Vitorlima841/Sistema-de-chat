import {BadRequestException, Injectable} from '@nestjs/common';
import { Sala } from 'src/model/sala.entity';
import {Usuario} from "../model/usuario.entity";
import {SalaUsuario} from "../model/salaUsuario.entity";
import {TipoUsuario} from "../shared/enums/TipoUsuario";
import {Mensagem} from "../model/mensagem.entity";

@Injectable()
export class SalaRepository {
    constructor() {}

    create(dados: Partial<Sala>): Sala {
    return Sala.create<Sala>(dados);
    }

    async salvaSala(sala: Sala): Promise<Sala> {
        return await Sala.save(sala);
    }

    async buscarMensagemsDaSala(salaId: number) {
        return await Mensagem.createQueryBuilder("mensagem")
            .innerJoinAndSelect("mensagem.sala", "sala")
            .innerJoinAndSelect("mensagem.remetente", "remetente")
            .where("sala.id = :salaId", { salaId })
            .getMany();
    }


    async listarSalas(): Promise<Sala[]> {
        return Sala.createQueryBuilder('sala').getMany();
    }

    async buscaSalaPorId(id: number): Promise<Sala | null> {
        return await Sala.findOne({
            where: { id },
        });
    }

    async removeRls(sala: Sala, rlsSalaUsuario: SalaUsuario[]): Promise<Sala> {
        await SalaUsuario.remove(rlsSalaUsuario);
        return await Sala.remove(sala);
    }

    async removeRl(rlsSalaUsuario: SalaUsuario): Promise<SalaUsuario> {
        return await SalaUsuario.remove(rlsSalaUsuario);
    }

    async buscaTodasRls(sala: Sala): Promise<SalaUsuario[]> {
        return await SalaUsuario.createQueryBuilder('sl_usu')
            .innerJoinAndSelect('sl_usu.salas', 'sala')
            .where('sala.id = :salaId', { salaId: sala.id })
            .getMany();
    }

    async buscaRlDoUsuario(sala: Sala, usuarioId: number): Promise<SalaUsuario> {
        return await SalaUsuario.createQueryBuilder('sl_usu')
            .innerJoinAndSelect('sl_usu.salas', 'sala')
            .innerJoinAndSelect('sl_usu.usuarios', 'usuario')
            .where('sala.id = :salaId', { salaId: sala.id })
            .andWhere('usuario.id = :usuarioId', { usuarioId: usuarioId })
            .getOne();
    }

    async validaPermicaoRemoverSala(sala: Sala, usuario: Usuario) {
        const salaUsuario = await SalaUsuario.createQueryBuilder('sl_usu')
            .innerJoinAndSelect('sl_usu.salas', 'sala')
            .innerJoinAndSelect('sl_usu.usuarios', 'usu')
            .where('sala.id = :salaId', { salaId: sala.id })
            .andWhere('usu.id = :usuarioId', { usuarioId: usuario.id })
            .andWhere('sl_usu.cargo IN (:...cargos)', { cargos: [TipoUsuario.DONO, TipoUsuario.ADMIN] })
            .getOne();

        if(salaUsuario.cargo !== TipoUsuario.DONO && salaUsuario.cargo !== TipoUsuario.ADMIN ){
            throw new BadRequestException("Apenas o dono ou um administrador pode remover uma sala");
        }
    }


    async validaPermicaoRemoverUsuario(sala: Sala, usuario: Usuario) {
        const teste = await Sala.createQueryBuilder('sala')
            .innerJoin("sala_usuario", "sl_usu", "sl_usu.sala_id = sala.id")
            .innerJoin("usuario", "usu", "usu.id = sl_usu.usuario_id")
            .where("sala.id = :salaId", {salaId: sala.id})
            .andWhere("usu.id = :usuarioId", {usuarioId: usuario.id})
            .andWhere("sl_usu.cargo in (:cargos)", {cargos: [TipoUsuario.DONO, TipoUsuario.ADMIN]})
            .getMany();
        console.log(teste);
    }
}
