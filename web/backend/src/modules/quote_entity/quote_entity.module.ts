import { Module } from '@nestjs/common';
import { QuoteEntityService } from './quote_entity.service';
import { QuoteEntityController } from './quote_entity.controller';

@Module({
  controllers: [QuoteEntityController],
  providers: [QuoteEntityService]
})
export class QuoteEntityModule {}
