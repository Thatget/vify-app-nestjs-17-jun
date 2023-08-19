import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { DatabaseModule } from '../database/database.module';
import { quoteProviders } from './quote.providers';
import { StoreModule } from '../store/store.module';
import { QuoteAnalysisService } from './quote-analysis.service';

@Module({
  imports: [DatabaseModule, StoreModule],
  controllers: [QuoteController],
  providers: [...quoteProviders, QuoteService, QuoteAnalysisService],
  exports: [QuoteService, QuoteAnalysisService]
})
export class QuoteModule {}
