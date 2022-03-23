import { Test, TestingModule } from '@nestjs/testing';
import { MixesService } from './mixes.service';

describe('MixesService', () => {
  let service: MixesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MixesService],
    }).compile();

    service = module.get<MixesService>(MixesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
