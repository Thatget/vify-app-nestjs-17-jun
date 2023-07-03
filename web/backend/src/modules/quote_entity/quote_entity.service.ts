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
      return await this.quoteEntityRepository.findBy({ shop });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} quoteEntity`;
  }

  update(id: number, quoteEntityDto: QuoteEntityDto) {
    return `This action updates a #${id} quoteEntity`;
  }

  remove(id: number) {
    return `This action removes a #${id} quoteEntity`;
  }
}
