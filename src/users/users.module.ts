import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users_cyc } from './entities/user.entity';
import { LevelUsersModule } from '#/level-users/level-users.module';
import { KitchenStudio } from '#/kitchen_studio/entities/kitchen_studio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users_cyc]),TypeOrmModule.forFeature([KitchenStudio]), LevelUsersModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
