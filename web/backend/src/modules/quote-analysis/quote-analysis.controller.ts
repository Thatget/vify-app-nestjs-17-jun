import {
  Controller,
  Get,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { StoreService } from '../store/store.service';
import { QuoteAnalysisService } from '../quote/quote-analysis.service';

@Controller('api/quote-analysis')
export class QuoteAnalysisController {
  constructor(
    private readonly storeService: StoreService,
    private readonly quoteAnalysisService: QuoteAnalysisService
  ) {}
  @Get('/products')
  async productsQuote(@Res() res: Response) {
    const shopDomain = res.locals.shopify.session.shop;
    const foundStore = await this.storeService.findByShopDomain(shopDomain);
    const store_id = foundStore.id;
    this.quoteAnalysisService.countProduct(store_id)
  }
}
