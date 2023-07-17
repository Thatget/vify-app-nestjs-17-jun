import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { DatabaseModule } from '../database/database.module';
import { quoteProviders } from './quote.providers';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [DatabaseModule, StoreModule],
  controllers: [QuoteController],
  providers: [...quoteProviders, QuoteService],
  exports: [QuoteService]
})
export class QuoteModule {}
