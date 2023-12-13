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

  async findByType(inputType: string) {
    let typePay: any;
    if (inputType === 'regular class') {
      typePay = type.REGCLASS;
    } else if (inputType === 'private class') {
      typePay = type.PRIVCLASS;
    } else if (inputType === 'class proposal') {
      typePay = type.CLASSPROP;
    }
    try {
      console.log(typePay, 'ini type');
      const result = await this.usersPayRepo.find({
        where: { type: typePay },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  async findByStatus(inputStatus: string) {
    let statusPayment: any;
    if (inputStatus === 'approve') {
      statusPayment = statusPay.APPROVE;
    } else if (inputStatus === 'reject') {
      statusPayment = statusPay.REJECT;
    } else if (inputStatus === 'pending') {
      statusPayment = statusPay.PENDING;
    } else if (inputStatus === 'done paid') {
      statusPayment = statusPay.DONEPAID;
    }
    try {
      console.log(statusPayment, 'ini status');
      const result = await this.usersPayRepo.find({
        where: { status: statusPayment },
      });
      return result;
    } catch (e) {
      throw e;
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

  async bookingKelasTrainee(bookingKelasDto: BookingKelasDto) {
    try {
      const users = await this.usersService.getUsersById(bookingKelasDto.users);
      // const bank = await this.bankService.getBankById(bookingKelasDto.bank)
      // console.log(bank, "ini bank")
      const regular = await this.regularService.findById(
        bookingKelasDto.idclass,
      );
      if (regular.numberOfBenches > 0) {
        regular.numberOfBenches--;
      }
      console.log(regular, 'bangku');
      const date = new Date();
      console.log(date.toLocaleString(), 'tanggal');
      const booking = new UsersPayment();
      booking.users = users;
      // if(bank.users.level === users.level){
      //     booking.bank = bank
      //     console.log("oke banget")
      // }
      booking.regular = regular;
      booking.price = regular.price;
      booking.totalPayment = booking.price;
      booking.date = date;
      booking.type = bookingKelasDto.typePay;

      const bookingkelas = await this.usersPayRepo.insert(booking);
      const result = await this.usersPayRepo.findOneOrFail({
        where: { id: bookingkelas.identifiers[0].id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  async bookingPrivateTrainee(bookingKelasDto: BookingKelasDto) {
    try {
      const users = await this.usersService.getUsersById(bookingKelasDto.users);
      // const bank = await this.bankService.getBankById(bookingKelasDto.bank)
      // console.log(bank, "ini bank")
      const priv = await this.privateService.findDetailPrivate(
        bookingKelasDto.idclass,
      );
      const price = priv.theme.price;
      const startDate: any = new Date(priv.startDate);
      const endDate: any = new Date(priv.endDate);
      const jumHari = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      console.log(jumHari, 'this');
      const total = price * jumHari;
      console.log(total, 'ini total');
      console.log(priv.startDate, 'hello');

      const date = new Date();
      console.log(date.toLocaleString(), 'tanggal');
      const booking = new UsersPayment();
      booking.users = users;
      // booking.bank = bank
      booking.privclass = priv;
      booking.price = price;
      booking.totalPayment = total;
      booking.date = date;
      booking.type = bookingKelasDto.typePay;

      const bookingkelas = await this.usersPayRepo.insert(booking);
      const result = await this.usersPayRepo.findOneOrFail({
        where: { id: bookingkelas.identifiers[0].id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
