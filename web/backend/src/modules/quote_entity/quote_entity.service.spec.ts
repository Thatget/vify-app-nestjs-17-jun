import { Test, TestingModule } from '@nestjs/testing';
import { QuoteEntityService } from './quote_entity.service';

describe('QuoteEntityService', () => {
  let service: QuoteEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteEntityService],
    }).compile();

    service = module.get<QuoteEntityService>(QuoteEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
