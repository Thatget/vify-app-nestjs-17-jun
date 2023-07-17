import { Inject, Injectable } from '@nestjs/common';
import { QuoteEntityDto } from './dto/quote_entity.dto';
import { In, Repository } from 'typeorm';
import { QuoteEntity } from './entities/quote_entity.entity';
import { Store } from '../store/entities/store.entity';

@Injectable()
export class QuoteEntityService {
  constructor(
    @Inject('QUOTE_ENTITY_REPOSITORY')
    private quoteEntityRepository: Repository<QuoteEntity>,
  ) {}

  async createUpdateEntity(entities: QuoteEntityDto[]) {
    try {
      await this.quoteEntityRepository.upsert(entities, ['name', 'store_id']);
    } catch (error) {
      throw error;
    }
  }

  async findByStore(store: Store) {
    try {
      return await this.quoteEntityRepository.findBy({
        store: store,
      });
    } catch (error) {
      throw error;
    }
  }
  async findByStoreId(store_id: number, attributes: string[]):Promise<QuoteEntity[]> {
    try {
      return await this.quoteEntityRepository.findBy({
        store_id,
        name: In(attributes)
      });
    } catch (error) {
      throw error;
    }
  }
}
