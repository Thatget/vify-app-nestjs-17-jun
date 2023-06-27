import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { settingProviders } from './setting.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SettingController],
  providers: [ ...settingProviders, SettingService]
})
export class SettingModule {}
