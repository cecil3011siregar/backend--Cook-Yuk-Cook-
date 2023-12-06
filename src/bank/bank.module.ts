import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { Bank } from './entities/bank.entity';
import { UsersModule } from '#/users/users.module';


@Module({
  imports: [TypeOrmModule.forFeature([Bank]), UsersModule],
  controllers: [BankController],
  providers: [ BankService],
  exports:[BankService]
})
export class BankModule {}
