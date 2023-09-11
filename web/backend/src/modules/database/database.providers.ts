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
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      });
      // console.log('dataSource', dataSource);
      try {
        const isInitialized: boolean = dataSource.isInitialized;
        // const driver: Driver = dataSource.driver;
        // console.log('driver', driver);
        console.log('isInitialized', isInitialized);
        return dataSource.initialize();
      } catch (e) {
        console.log('big error');
      }
    },
  },
];
