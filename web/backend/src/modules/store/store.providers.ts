import { DataSource } from 'typeorm';
import { Store } from './entities/store.entity';

export const storeProviders = [
  {
    provide: 'STORE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Store),
    inject: ['DATA_SOURCE'],
  },
];