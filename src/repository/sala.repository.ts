import { Injectable } from '@nestjs/common';
import {DataSource} from "typeorm";
import {Usuario} from "../model/usuario.entity";
import { Sala } from 'src/model/sala.entity';

@Injectable()
export class SalaRepository {
    constructor() {}

    async salvaSala(sala: Sala): Promise<Sala> {
        return await Sala.save(sala);
    }


}
