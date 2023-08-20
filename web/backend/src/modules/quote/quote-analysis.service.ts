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
    const a = await this.quoteRepository
      .createQueryBuilder('quote')
      .select('JSON_UNQUOTE(JSON_EXTRACT(quote.product, "$.selected_product.id"))', 'productId')
      .getRawMany()
    console.log(a);
  }
}
