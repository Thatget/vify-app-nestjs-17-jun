import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../../config/database.config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    // imports: [ConfigModule],
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'vify_user',
        password: 'vify_password',
        database: 'vify_database',
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      });

      return dataSource.initialize();
    },
  },
];