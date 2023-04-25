import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import './envs';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE == 'true',
  dropSchema: process.env.TYPEORM_DROPSCHEMA == 'true',
  autoLoadEntities: true,
  maxQueryExecutionTime: 1000,
  logging: true,
};
