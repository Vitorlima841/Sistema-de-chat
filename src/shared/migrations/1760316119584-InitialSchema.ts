import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1760316119584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE usuario (
                id INT AUTO_INCREMENT NOT NULL,
                nome VARCHAR(255) NOT NULL,
                login VARCHAR(255) NOT NULL,
                senha VARCHAR(255) NOT NULL,
                PRIMARY KEY (id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE usuario;`);
    }

}
