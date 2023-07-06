import { Module } from '@nestjs/common';
import { StoreFrontendService } from './store-frontend.service';
import { StoreFrontendController } from './store-frontend.controller';

@Module({
  controllers: [StoreFrontendController],
  providers: [StoreFrontendService]
})
export class StoreFrontendModule {}
