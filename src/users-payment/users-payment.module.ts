import { Module } from '@nestjs/common';
import { UsersPaymentController } from './users-payment.controller';
import { UsersPaymentService } from './users-payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersPayment } from './entities/users-payment.entity';
import { BankModule } from '#/bank/bank.module';
import { UsersModule } from '#/users/users.module';
import { RegularClassModule } from '#/regular-class/regular-class.module';

@Module({
  imports:[TypeOrmModule.forFeature([UsersPayment]), BankModule,RegularClassModule, UsersModule],
  controllers: [UsersPaymentController],
  providers: [UsersPaymentService]
})
export class UsersPaymentModule {}
