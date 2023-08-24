import { Module } from '@nestjs/common';
import { QuoteEntityService } from './quote_entity.service';
import { QuoteEntityController } from './quote_entity.controller';
import { DatabaseModule } from '../database/database.module';
import { QuoteEntityProviders } from './quote_entity.providers';
import { StoreModule } from '../store/store.module';

const allowedAttribute = [
  'name',
  'email',
  'email_title',
  'message_title',
  'hide_price',
  'all_product',
  'hide_buy_now',
  'hide_add_to_cart',
  'show_request_for_quote',
  'message_placeholder',
  'email_placeholder',
  'thank_title',
  'thank_content',
  'shopping_button',
  'name_placeholder',
  'form_title',
  'submit_button_text',
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
