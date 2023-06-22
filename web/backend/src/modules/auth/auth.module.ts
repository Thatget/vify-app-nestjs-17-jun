import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [StoreModule],
  controllers: [AuthController]
})
export class AuthModule {}
