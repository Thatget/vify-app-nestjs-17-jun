import { Module } from '@nestjs/common';
import { StoreModule } from '../store/store.module';
import { QuoteAnalysisController } from './quote-analysis.controller';
import { QuoteModule } from '../quote/quote.module';

@Module({
  imports: [StoreModule, QuoteModule],
  controllers: [QuoteAnalysisController],
})
export class QuoteAnalysisModule {}
