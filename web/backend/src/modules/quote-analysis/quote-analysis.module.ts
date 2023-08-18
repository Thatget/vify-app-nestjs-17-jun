import { Module } from '@nestjs/common';
import { StoreModule } from '../store/store.module';
import { QuoteAnlysisController } from './quote-analysis.controller';

@Module({
  imports: [StoreModule],
  controllers: [QuoteAnlysisController],
})
export class QuoteEntityModule {}
