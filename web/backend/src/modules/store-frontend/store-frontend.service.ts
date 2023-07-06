import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreFrontendService {
  create(_createStoreFrontendDto) {
    return 'This action adds a new storeFrontend';
  }

  findAll() {
    return `This action returns all storeFrontend`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storeFrontend`;
  }

  update(id: number, updateStoreFrontendDto) {
    return `This action updates a #${id} storeFrontend`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeFrontend`;
  }
}
