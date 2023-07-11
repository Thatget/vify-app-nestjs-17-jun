import { Inject, Injectable } from '@nestjs/common';
import { QuoteEntityDto } from './dto/quote_entity.dto';
import { Repository } from 'typeorm';
import { QuoteEntity } from './entities/quote_entity.entity';

@Injectable()
export class QuoteEntityService {
  constructor(
    @Inject ('QUOTE_ENTITY_REPOSITORY')
    private quoteEntityRepository: Repository<QuoteEntity>,
  ) {}
  async createUpdateEntity(entities: QuoteEntityDto[]) {
    try {
      await this.quoteEntityRepository.upsert(entities, ['name', 'shop']);
    } catch (error) {
      throw error;
    }
  }

  async findByShop(shop: string) {
    try {
      const entities = await this.quoteEntityRepository.findBy({ shop });
      return entities;
    } catch (error) {
      throw error;
    }
  }
}
