import { Module } from '@nestjs/common';
import { UsersPaymentController } from './users-payment.controller';
import { UsersPaymentService } from './users-payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersPayment } from './entities/users-payment.entity';
import { BankModule } from '#/bank/bank.module';
import { UsersModule } from '#/users/users.module';
import { RegularClassModule } from '#/regular-class/regular-class.module';
import { PrivateClassModule } from '#/private-class/private-class.module';
import { RegularClass } from '#/regular-class/entities/regular-class.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UsersPayment, RegularClass]), BankModule, RegularClassModule, UsersModule, PrivateClassModule],
  controllers: [UsersPaymentController],
  providers: [UsersPaymentService],
  exports:[UsersPaymentService]
})
export class UsersPaymentModule {}
