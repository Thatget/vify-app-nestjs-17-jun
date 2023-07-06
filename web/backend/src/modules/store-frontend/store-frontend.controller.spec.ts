import { Test, TestingModule } from '@nestjs/testing';
import { StoreFrontendController } from './store-frontend.controller';
import { StoreFrontendService } from './store-frontend.service';

describe('StoreFrontendController', () => {
  let controller: StoreFrontendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreFrontendController],
      providers: [StoreFrontendService],
    }).compile();

    controller = module.get<StoreFrontendController>(StoreFrontendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
