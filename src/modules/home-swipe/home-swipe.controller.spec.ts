import { Test, TestingModule } from '@nestjs/testing';
import { HomeSwipeController } from './home-swipe.controller';

describe('HomeSwipe Controller', () => {
  let controller: HomeSwipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeSwipeController],
    }).compile();

    controller = module.get<HomeSwipeController>(HomeSwipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
