import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users_cyc } from './entities/user.entity';
import { LevelUsersModule } from '#/level-users/level-users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users_cyc]), LevelUsersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
