import { Injectable } from '@nestjs/common';
import { Sala } from 'src/model/sala.entity';

@Injectable()
export class SalaRepository {
    constructor() {}

    create(dados: Partial<Sala>): Sala {
    return Sala.create<Sala>(dados);
    }

    async salvaSala(sala: Sala): Promise<Sala> {
    return await Sala.save(sala);
    }

    async buscarMensagemsDaSala(salaId: number){
        return await Sala.createQueryBuilder("sala")
            .where("sala.id == :salaId", {salaId})
            .getMany();
    }

    async listarSalas(): Promise<Sala[]> {
        return Sala.createQueryBuilder('sala').getMany();
    }

    async findOne(id: number): Promise<Sala | null> {
        return await Sala.findOne({
            where: { id },
            relations: ['dono'], 
        });
    }

    async remove(sala: Sala): Promise<Sala> {
        return await Sala.remove(sala);
    }
}
