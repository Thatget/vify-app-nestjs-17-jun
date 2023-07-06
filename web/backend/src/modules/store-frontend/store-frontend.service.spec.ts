import { Test, TestingModule } from '@nestjs/testing';
import { StoreFrontendService } from './store-frontend.service';

describe('StoreFrontendService', () => {
  let service: StoreFrontendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreFrontendService],
    }).compile();

    service = module.get<StoreFrontendService>(StoreFrontendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
