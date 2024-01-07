import { Module } from '@nestjs/common';
import { PrivateClassController } from './private-class.controller';
import { PrivateClassService } from './private-class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { PrivateClass } from './entities/private-class.entity';
import { KitchenStudioModule } from '#/kitchen_studio/kitchen_studio.module';
import { TrainingThemeModule } from '#/training_theme/training_theme.module';
import { UsersModule } from '#/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([PrivateClass]),UsersModule, KitchenStudioModule, TrainingThemeModule],
  controllers: [PrivateClassController],
  providers: [PrivateClassService],
  exports:[PrivateClassService]
})
export class PrivateClassModule {}
