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

@Controller('api/quote-analysis')
export class QuoteAnlysisController {
  constructor(
    private readonly storeService: StoreService,
  ) {}
  @Get('/product')
  async productsQuote(params:string) {
    
  }
}
