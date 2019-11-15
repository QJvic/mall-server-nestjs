import { Test, TestingModule } from '@nestjs/testing';
import { HomeIconController } from './home-icon.controller';

describe('HomeIcon Controller', () => {
  let controller: HomeIconController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeIconController],
    }).compile();

    controller = module.get<HomeIconController>(HomeIconController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
