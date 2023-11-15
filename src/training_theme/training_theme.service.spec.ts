import { Test, TestingModule } from '@nestjs/testing';
import { TrainingThemeService } from './training_theme.service';

describe('TrainingThemeService', () => {
  let service: TrainingThemeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingThemeService],
    }).compile();

    service = module.get<TrainingThemeService>(TrainingThemeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
