import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuoteAnalysisService {
  constructor(
    @Inject('QUOTE_REPOSITORY')
    private readonly quoteRepository: Repository<Quote>,
  ) {}
  async countProduct(store_id: number) {
    this.quoteRepository
      .createQueryBuilder('quote')
      .select('quote.product->>"$.productId"', 'productId')
      .addSelect('COUNT(*)', 'count')
      .groupBy('entity.data->>"$.productId"')
      .getRawMany();
  }
}
