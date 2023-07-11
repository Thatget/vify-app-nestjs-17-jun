import { Module } from '@nestjs/common';
import { StoreFrontendService } from './store-frontend.service';
import { StoreFrontendController } from './store-frontend.controller';
import { QuoteEntityModule } from '../quote_entity/quote_entity.module';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [QuoteEntityModule, StoreModule],
  controllers: [StoreFrontendController],
  providers: [StoreFrontendService]
})
export class StoreFrontendModule {}
