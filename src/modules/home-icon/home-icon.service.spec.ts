import { Test, TestingModule } from '@nestjs/testing';
import { HomeIconService } from './home-icon.service';

describe('HomeIconService', () => {
  let service: HomeIconService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeIconService],
    }).compile();

    service = module.get<HomeIconService>(HomeIconService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
