import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { DatabaseModule } from '../database/database.module';
import { storeProviders } from './store.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController],
  providers: [ ...storeProviders,StoreService],
  exports: [StoreService]
})
export class StoreModule {}
