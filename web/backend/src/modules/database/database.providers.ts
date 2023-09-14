import { join } from 'path';
import { DataSource, Driver } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'vify_database',
        synchronize: true,
        entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
      });
      const isInit = dataSource.isInitialized;
      console.log('isInit', isInit);
      return await dataSource.initialize();
    },
  },
];
