import { Module } from '@nestjs/common';
import { RegularClassController } from './regular-class.controller';
import { RegularClassService } from './regular-class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KitchenStudio } from '#/kitchen_studio/entities/kitchen_studio.entity';
import { RegularClass } from './entities/regular-class.entity';
import { KitchenStudioModule } from '#/kitchen_studio/kitchen_studio.module';
import { TrainingThemeModule } from '#/training_theme/training_theme.module';
import { UsersModule } from '#/users/users.module';
import { UsersPayment } from '#/users-payment/entities/users-payment.entity';
import { UsersPaymentModule } from '#/users-payment/users-payment.module';

@Module({
  imports:[TypeOrmModule.forFeature([RegularClass]), TypeOrmModule.forFeature([UsersPayment]), KitchenStudioModule, TrainingThemeModule, UsersModule],
  controllers: [RegularClassController],
  providers: [RegularClassService],
  exports:[RegularClassService]
})
export class RegularClassModule {}
