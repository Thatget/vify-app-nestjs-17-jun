import {Repository} from 'typeorm';
import {Injectable, Inject} from '@nestjs/common';
import {StoreDto} from './dto/store.dto';
import {Store} from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @Inject('STORE_REPOSITORY')
    private storesRepository: Repository<Store>,
  ) {
  }

  async createOrUpdate(storeDto: StoreDto, accessToken: string): Promise<StoreDto> {
    const store = await this.storesRepository.findOneBy({shop: storeDto.shop});
    if (store) {
      await this.storesRepository.save({...storeDto, id: store.id, accessToken })
    }
    this.storesRepository.create({ ...storeDto, accessToken})
    return store;
  }

  async findByShopDomain(shop: string): Promise<Store> {
    if (shop) {
      return await this.storesRepository.findOneBy({shop: shop});
    } else {
      return null;
    }
  }
  async deleteByShopDomain (shop: string): Promise<void> {
    await this.storesRepository.delete({shop});
  }
}
