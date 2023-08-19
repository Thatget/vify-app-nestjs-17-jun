import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  Inject,
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
  async productsQuote(params:string) {
    this.quoteAnalysisService.countProduct(1)
  }
}
