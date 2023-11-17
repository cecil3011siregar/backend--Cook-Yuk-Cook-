import { Test, TestingModule } from '@nestjs/testing';
import { LevelUsersService } from './level-users.service';

describe('LevelUsersService', () => {
  let service: LevelUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelUsersService],
    }).compile();

    service = module.get<LevelUsersService>(LevelUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
