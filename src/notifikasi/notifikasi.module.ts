import { Module } from '@nestjs/common';
import { NotifikasiController } from './notifikasi.controller';
import { NotifikasiService } from './notifikasi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifikasi } from './entities/notifikasi.entity';
import { UsersModule } from '#/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Notifikasi]), UsersModule],
  controllers: [NotifikasiController],
  providers: [NotifikasiService]
})
export class NotifikasiModule {}
