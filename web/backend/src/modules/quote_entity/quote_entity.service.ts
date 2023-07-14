import { Inject, Injectable } from '@nestjs/common';
import { QuoteEntityDto } from './dto/quote_entity.dto';
import { Repository } from 'typeorm';
import { QuoteEntity } from './entities/quote_entity.entity';
import { Store } from '../store/entities/store.entity';
import { UpdateProductDto } from '../product/dto/update-product.dto';

@Injectable()
export class QuoteEntityService {
  constructor(
    @Inject('QUOTE_ENTITY_REPOSITORY')
    private quoteEntityRepository: Repository<QuoteEntity>,
  ) {}

  async createUpdateEntity(entities: QuoteEntityDto[]) {
    try {
      // await this.quoteEntityRepository.insert(entities)
      // await this.quoteEntityRepository.update()
      await this.quoteEntityRepository.upsert(entities, ['name', 'storeId']);
    } catch (error) {
      throw error;
    }
  }

  // async update(id: string, updateProductDto: UpdateProductDto) {
  //   const Product = this.findOne(id);
  //   return this.productRepository.update(id, updateProductDto);
  // }
  async findByStore(store: Store) {
    try {
      return await this.quoteEntityRepository.findBy({
        store: store,
      });
    } catch (error) {
      throw error;
    }
  }
}
