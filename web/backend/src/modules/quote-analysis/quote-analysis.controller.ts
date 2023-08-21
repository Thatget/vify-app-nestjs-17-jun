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
    try {
      console.log(new Date().getTimezoneOffset())
      const shopDomain = res.locals.shopify.session.shop;
      const foundStore = await this.storeService.findByShopDomain(shopDomain);
      const store_id = foundStore.id;
      const topProducts = await this.quoteAnalysisService.countProduct(store_id)
      return res.status(200).send({data: topProducts})
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
}
