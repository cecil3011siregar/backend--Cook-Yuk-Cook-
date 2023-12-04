import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training_theme } from './entities/training_theme.entity';
import { TrainingThemeController } from './training_theme.controller';
import { TrainingThemeService } from './training_theme.service';


@Module({
    imports: [TypeOrmModule.forFeature([Training_theme])],
    controllers: [TrainingThemeController],
    providers: [TrainingThemeService],
    exports: [TrainingThemeService]
})
export class TrainingThemeModule {}
