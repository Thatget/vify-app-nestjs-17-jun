import { DataSource } from 'typeorm';
import { QuoteEntity } from './entities/quote_entity.entity';

export const QuoteEntityProviders = [
  {
    provide: 'QUOTE_ENTITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(QuoteEntity),
    inject: ['DATA_SOURCE'],
  },
];