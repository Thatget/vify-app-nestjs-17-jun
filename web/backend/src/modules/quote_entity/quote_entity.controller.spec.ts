import { Test, TestingModule } from '@nestjs/testing';
import { QuoteEntityController } from './quote_entity.controller';
import { QuoteEntityService } from './quote_entity.service';

describe('QuoteEntityController', () => {
  let controller: QuoteEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteEntityController],
      providers: [QuoteEntityService],
    }).compile();

    controller = module.get<QuoteEntityController>(QuoteEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
