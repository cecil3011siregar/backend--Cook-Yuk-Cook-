import { Test, TestingModule } from '@nestjs/testing';
import { LevelUsersController } from './level-users.controller';

describe('LevelUsersController', () => {
  let controller: LevelUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelUsersController],
    }).compile();

    controller = module.get<LevelUsersController>(LevelUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
