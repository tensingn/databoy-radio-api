import { Test, TestingModule } from '@nestjs/testing';
import { MixesController } from './mixes.controller';
import { MixesService } from './mixes.service';

describe('MixesController', () => {
  let controller: MixesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MixesController],
      providers: [MixesService],
    }).compile();

    controller = module.get<MixesController>(MixesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
