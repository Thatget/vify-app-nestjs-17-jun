import { Inject, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class SettingService {
  constructor(
    @Inject ('SETTING_REPOSITORY')
    private settingRepository: Repository<Setting>,
  ) {}
  async createOrUpdate(createSettingDto: CreateSettingDto) {
    const shop = createSettingDto.shop;
    if (shop) {
      const options: FindOneOptions<Setting> = {
        where: { shop },
      };
      const settingExit = await this.settingRepository.findOne(options);
      if (settingExit) {
        // Cập nhật entity đã tồn tại
        const entityUpdate = { ...settingExit, ...createSettingDto };
        return this.settingRepository.save(entityUpdate);
      } else {
        // Tạo mới entity
        return this.settingRepository.save(createSettingDto);
      }
    }
    throw new Error('store is required');
  }

  async findByShop(shop: string) {
    const options: FindOneOptions<Setting> = {
      where: { shop },
    };
    const setting = await this.settingRepository.findOne(options);
    return setting;
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return `This action updates a #${id} setting`;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
