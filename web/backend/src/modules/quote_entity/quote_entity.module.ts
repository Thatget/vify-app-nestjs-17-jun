import { Module } from '@nestjs/common';
import { QuoteEntityService } from './quote_entity.service';
import { QuoteEntityController } from './quote_entity.controller';
import { DatabaseModule } from '../database/database.module';
import { QuoteEntityProviders } from './quote_entity.providers';
import { StoreModule } from '../store/store.module';

const allowedAttribute = [
  'name',
  'email',
  'message',
  'hide_price',
  'hide_buy_now',
  'hide_add_to_cart',
  'show_request_for_quote',
];

@Module({
  imports: [DatabaseModule, StoreModule],
  controllers: [QuoteEntityController],
  providers: [
    ...QuoteEntityProviders,
    QuoteEntityService,
    {
      provide: 'DefaultQuoteEntity',
      useValue: allowedAttribute,
    },
  ],
  exports: [QuoteEntityService, 'DefaultQuoteEntity'],
})
export class QuoteEntityModule {}
