import {Repository} from 'typeorm';
import {Injectable, Inject} from '@nestjs/common';
import {CreateStoreDto} from './dto/create-store.dto';
import {UpdateStoreDto} from './dto/update-store.dto';
import {Store} from './entities/store.entity';

@Injectable()
export class StoreService {
    constructor(
        @Inject('STORE_REPOSITORY')
        private storesRepository: Repository<Store>,
    ) {
    }

    async createOrUpdate(createStoreDto: CreateStoreDto) {
      const store = await this.storesRepository.findOneBy({shop: createStoreDto.shop});
      if (store) {
        await this.storesRepository.save({...createStoreDto, id: store.id })
      }
      this.storesRepository.create({ ...createStoreDto})
      return store;
    }

    async findAll() {
        return `This action returns all store`;
    }

    async findByShopDomain(shop: string): Promise<Store> {
      return await this.storesRepository.findOne({where: {shop: shop}});
    }

    async update(id: number, updateStoreDto: UpdateStoreDto) {
        return `This action updates a #${id} store`;
    }

    remove(id: number) {
        return `This action removes a #${id} store`;
    }
}
