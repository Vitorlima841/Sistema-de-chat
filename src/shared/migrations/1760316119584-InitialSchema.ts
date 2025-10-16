import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1760316119584 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE Usuario (
             id INT AUTO_INCREMENT NOT NULL,
             nome VARCHAR(255) NOT NULL,
             login VARCHAR(255) NOT NULL,
             senha VARCHAR(255) NOT NULL,
             PRIMARY KEY (id)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE Sala (
                id INT AUTO_INCREMENT NOT NULL,
                nome VARCHAR(255) NOT NULL,
                descricao VARCHAR(255) NOT NULL,
                tipo INT NOT NULL,
                PRIMARY KEY (id)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE Sala_usuario (
                id INT AUTO_INCREMENT NOT NULL,
                cargo INT NOT NULL,
                usuario_id INT NOT NULL,
                sala_id INT NOT NULL,
                PRIMARY KEY (id),
                INDEX IDX_sala_usuario_usuario_id (usuario_id),
                INDEX IDX_sala_usuario_sala_id (sala_id),
                CONSTRAINT FK_sala_usuario_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
                CONSTRAINT FK_sala_usuario_sala FOREIGN KEY (sala_id) REFERENCES sala(id) ON DELETE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE TABLE Mensagem (
                id INT AUTO_INCREMENT NOT NULL,
                conteudo VARCHAR(1000) NOT NULL,
                remetente_id INT NULL,
                destinatario_id INT NULL,
                sala_id INT NULL,
                PRIMARY KEY (id),
                INDEX IDX_mensagem_remetente_id (remetente_id),
                INDEX IDX_mensagem_destinatario_id (destinatario_id),
                INDEX IDX_mensagem_sala_id (sala_id),
                CONSTRAINT FK_mensagem_remetente FOREIGN KEY (remetente_id) REFERENCES usuario(id) ON DELETE SET NULL,
                CONSTRAINT FK_mensagem_destinatario FOREIGN KEY (destinatario_id) REFERENCES usuario(id) ON DELETE SET NULL,
                CONSTRAINT FK_mensagem_sala FOREIGN KEY (sala_id) REFERENCES sala(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS Mensagem;`);
        await queryRunner.query(`DROP TABLE IF EXISTS Sala_usuario;`);
        await queryRunner.query(`DROP TABLE IF EXISTS Sala;`);
        await queryRunner.query(`DROP TABLE IF EXISTS Usuario;`);
    }
}
