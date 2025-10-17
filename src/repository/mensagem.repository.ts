import { Injectable } from '@nestjs/common';
import {DataSource} from "typeorm";
import {Usuario} from "../model/usuario.entity";
import { Sala } from 'src/model/sala.entity';
import {Mensagem} from "../model/mensagem.entity";

@Injectable()
export class MensagemRepository {
    constructor() {}

    async salvaMensagem(mensagem: Mensagem){
        return await Mensagem.save(mensagem)
    }
}
