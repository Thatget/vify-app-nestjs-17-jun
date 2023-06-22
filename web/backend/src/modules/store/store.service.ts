import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}
  async create(createStoreDto: CreateStoreDto) {
    const store = this.storesRepository.create(createStoreDto);
    return await this.storesRepository.save(store);
  }

  async findAll() {
    return `This action returns all store`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
