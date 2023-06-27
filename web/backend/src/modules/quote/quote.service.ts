import { Inject, Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuoteService {
  constructor(
    @Inject('QUOTE_REPOSITORY')
    private quoteRepository: Repository<Quote>,
  ) {}
  create(createQuoteDto: CreateQuoteDto) {
    return 'This action adds a new quote';
  }

  async findAll() {
    return await this.quoteRepository.findAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} quote`;
  }

  update(id: number, updateQuoteDto: UpdateQuoteDto) {
    return `This action updates a #${id} quote`;
  }

  remove(id: number) {
    return `This action removes a #${id} quote`;
  }
}
