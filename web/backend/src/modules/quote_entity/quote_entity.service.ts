import { Inject, Injectable } from '@nestjs/common';
import { CreateQuoteEntityDto } from './dto/create-quote_entity.dto';
import { UpdateQuoteEntityDto } from './dto/update-quote_entity.dto';
import { Repository } from 'typeorm';
import { QuoteEntity } from './entities/quote_entity.entity';

@Injectable()
export class QuoteEntityService {
  constructor(
    @Inject ('QUOTE_ENTITY_REPOSITORY')
    private quoteEntityRepository: Repository<QuoteEntity>,
  ) {}
  async createUpdateEntity(createQuoteEntityDto: CreateQuoteEntityDto) {
    return 'This action adds a new quoteEntity';
  }

  findAll() {
    return `This action returns all quoteEntity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quoteEntity`;
  }

  update(id: number, updateQuoteEntityDto: UpdateQuoteEntityDto) {
    return `This action updates a #${id} quoteEntity`;
  }

  remove(id: number) {
    return `This action removes a #${id} quoteEntity`;
  }
}
