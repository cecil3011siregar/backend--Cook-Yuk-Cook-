import { Module } from '@nestjs/common';
import { LevelUsersController } from './level-users.controller';
import { LevelUsersService } from './level-users.service';

@Module({
  controllers: [LevelUsersController],
  providers: [LevelUsersService]
})
export class LevelUsersModule {}
