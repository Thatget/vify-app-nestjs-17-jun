import { DataSource } from 'typeorm';
import { Quote } from './entities/quote.entity';

export const quoteProviders = [
  {
    provide: 'QUOTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Quote),
    inject: ['DATA_SOURCE'],
  },
];