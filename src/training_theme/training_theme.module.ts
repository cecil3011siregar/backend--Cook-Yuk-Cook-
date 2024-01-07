import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training_theme } from './entities/training_theme.entity';
import { TrainingThemeController } from './training_theme.controller';
import { TrainingThemeService } from './training_theme.service';
import { UsersModule } from '#/users/users.module';


@Module({
    imports: [TypeOrmModule.forFeature([Training_theme]), UsersModule],
    controllers: [TrainingThemeController],
    providers: [TrainingThemeService],
    exports: [TrainingThemeService]
})
export class TrainingThemeModule {}
