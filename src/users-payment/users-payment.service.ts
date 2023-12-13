import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PembayaranPengajuanDto } from './dto/update-pembayaran-pengajuan.dto';
import { storagePayment } from './helpers/upload-payment-image';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPayment, statusPay, type } from './entities/users-payment.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { BankService } from '#/bank/bank.service';
import { RegularClassService } from '#/regular-class/regular-class.service';
import { UsersService } from '#/users/users.service';
import { BookingKelasDto } from './dto/booking-kelas.dto';
import { PrivateClassService } from '#/private-class/private-class.service';
import { PengajuanKelasDto } from './dto/pembayaran-pengajuan-kelas.dto';
import { Type } from 'class-transformer';
import { timeStamp } from 'console';
import { timestamp } from 'rxjs';
@Injectable()
export class UsersPaymentService {
  constructor(
    @InjectRepository(UsersPayment)
    private usersPayRepo: Repository<UsersPayment>,
    private bankService: BankService,
    private regularService: RegularClassService,
    private privateService: PrivateClassService,
    private usersService: UsersService,
  ) {}

  findAll() {
    return this.usersPayRepo.findAndCount();
  }

  async findById(id: string) {
    try {
      const jam = await this.usersPayRepo.findOneOrFail({ where: { id } });
      const cariJam = jam.date.toLocaleTimeString();
      console.log(cariJam, 'jam');
      return await this.usersPayRepo.findOneOrFail({
        where: { id },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data pembayaran tidak ditemukan',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }

  async uploadPembayaran(pembayaranPengajuanDto: PembayaranPengajuanDto) {
    try {
      const bank = await this.bankService.getBankById(
        pembayaranPengajuanDto.bank,
      );
      const users = await this.usersService.getUsersById(
        pembayaranPengajuanDto.users,
      );
      const regular = await this.regularService.findById(
        pembayaranPengajuanDto.regular,
      );
      const upload = new UsersPayment();
      // upload.bank = bank;
      upload.users = users;
      upload.regular = regular;
      upload.date = pembayaranPengajuanDto.date;
      upload.price = regular.price;
      upload.totalPayment = upload.price;
      upload.type = pembayaranPengajuanDto.typePay;
      // upload.photoProof = pembayaranPengajuanDto.photoProof;

      const coba = await this.usersPayRepo.insert(upload);
      console.log(coba);
      return this.usersPayRepo.findOneOrFail({
        where: { id: coba.identifiers[0].id },
      });
    } catch (e) {
      throw e;
    }
  }
}
