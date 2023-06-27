import { DataSource } from 'typeorm';

export const databaseProviders = [
  {

    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3309,
        username: 'root',
        password: 'root',
        database: 'vify_database',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];