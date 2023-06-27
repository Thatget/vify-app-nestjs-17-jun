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
  create(createSettingDto: CreateSettingDto) {
    return 'This action adds a new setting';
  }

  async findByShop(shop: string) {
    const options: FindOneOptions<Setting> = {
      where: { shop },
    };
    const setting = await this.settingRepository.findOne(options);
    return ;
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return `This action updates a #${id} setting`;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
