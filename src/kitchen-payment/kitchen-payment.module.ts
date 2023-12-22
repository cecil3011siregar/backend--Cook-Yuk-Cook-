import { Module } from '@nestjs/common';
import { KitchenPaymentController } from './kitchen-payment.controller';
import { KitchenPaymentService } from './kitchen-payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KitchenPayment } from './entity/kitchen-payment.entity';
import { UsersModule } from '#/users/users.module';
import { KitchenStudioModule } from '#/kitchen_studio/kitchen_studio.module';
import { UsersPaymentModule } from '#/users-payment/users-payment.module';
import { UsersPayment } from '#/users-payment/entities/users-payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KitchenPayment, UsersPayment]),UsersModule, KitchenStudioModule, UsersPaymentModule],
  controllers: [KitchenPaymentController],
  providers: [KitchenPaymentService],
})
export class KitchenPaymentModule {}
