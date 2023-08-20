import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuoteAnalysisService {
  constructor(
    @Inject('QUOTE_REPOSITORY')
    private readonly quoteRepository: Repository<Quote>,
  ) {}
  async countProduct(store_id: number, limit = 10) {
    const a = await this.quoteRepository
      .createQueryBuilder('quote')
      .select('JSON_UNQUOTE(JSON_EXTRACT(quote.product, "$.selected_product.id"))', 'productId')
      .addSelect('JSON_UNQUOTE(JSON_EXTRACT(quote.product, "$.selected_product.title"))', 'productTitle')
      .addSelect('JSON_UNQUOTE(JSON_EXTRACT(quote.product, "$.selected_product.image"))', 'productImage')
      .addSelect('JSON_UNQUOTE(JSON_EXTRACT(quote.product, "$.selected_variant.id"))', 'variantId')
      .addSelect('JSON_UNQUOTE(JSON_EXTRACT(quote.product, "$.selected_variant.title"))', 'variantTitle')
      .where({store_id: 22})
      .limit(limit)
      .groupBy('variantId')
      .getRawMany()
      console.log(a)
  }
}
