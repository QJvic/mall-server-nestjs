import { Test, TestingModule } from '@nestjs/testing';
import { HomeSwipeService } from './home-swipe.service';

describe('HomeSwipeService', () => {
  let service: HomeSwipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeSwipeService],
    }).compile();

    service = module.get<HomeSwipeService>(HomeSwipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
