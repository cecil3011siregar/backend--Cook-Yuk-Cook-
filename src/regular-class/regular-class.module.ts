import { Module } from '@nestjs/common';
import { RegularClassController } from './regular-class.controller';
import { RegularClassService } from './regular-class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KitchenStudio } from '#/kitchen_studio/entities/kitchen_studio.entity';
import { RegularClass } from './entities/regular-class.entity';
import { KitchenStudioModule } from '#/kitchen_studio/kitchen_studio.module';
import { TrainingThemeModule } from '#/training_theme/training_theme.module';
import { UsersModule } from '#/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([RegularClass]), KitchenStudioModule, TrainingThemeModule, UsersModule],
  controllers: [RegularClassController],
  providers: [RegularClassService],
  exports:[RegularClassService]
})
export class RegularClassModule {}
