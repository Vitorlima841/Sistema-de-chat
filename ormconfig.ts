import {ConnectionOptions, DataSource} from 'typeorm';
import 'dotenv/config';

export const config: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'SistemaDeChat',
    entities: [__dirname + '/src/model/*.entity{.ts,.js}'],
    synchronize: false,
    logging: false,
    migrations: [__dirname + '/src/shared/migrations/*{.ts,.js}'],
    migrationsTableName: 'migration',
};

const dataSource = new DataSource(config)
export default dataSource
