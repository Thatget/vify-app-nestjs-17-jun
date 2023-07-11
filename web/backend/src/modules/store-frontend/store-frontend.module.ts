import { Module } from '@nestjs/common';
import { StoreFrontendService } from './store-frontend.service';
import { StoreFrontendController } from './store-frontend.controller';
import { QuoteEntityModule } from '../quote_entity/quote_entity.module';

@Module({
  imports: [QuoteEntityModule],
  controllers: [StoreFrontendController],
  providers: [StoreFrontendService]
})
export class StoreFrontendModule {}
