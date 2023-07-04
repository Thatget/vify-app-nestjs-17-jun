import { Module } from '@nestjs/common';
import { QuoteEntityService } from './quote_entity.service';
import { QuoteEntityController } from './quote_entity.controller';
import { DatabaseModule } from '../database/database.module';
import { QuoteEntityProviders } from './quote_entity.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [QuoteEntityController],
  providers: [ ...QuoteEntityProviders,QuoteEntityService]
})
export class QuoteEntityModule {}
