import { Test, TestingModule } from '@nestjs/testing';
import { TrainingThemeController } from './training_theme.controller';

describe('TrainingThemeController', () => {
  let controller: TrainingThemeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingThemeController],
    }).compile();

    controller = module.get<TrainingThemeController>(TrainingThemeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
