import { Module } from '@nestjs/common';
import { QuoteEntityService } from './quote_entity.service';
import { QuoteEntityController } from './quote_entity.controller';
import { DatabaseModule } from '../database/database.module';
import { QuoteEntityProviders } from './quote_entity.providers';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [DatabaseModule, StoreModule],
  controllers: [QuoteEntityController],
  providers: [...QuoteEntityProviders, QuoteEntityService],
  exports: [QuoteEntityService],
})
export class QuoteEntityModule {}
