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
import { EntityNotFoundError, In, Repository, getRepository } from 'typeorm';
import { BankService } from '#/bank/bank.service';
import { RegularClassService } from '#/regular-class/regular-class.service';
import { UsersService } from '#/users/users.service';
import { BookingKelasDto } from './dto/booking-kelas.dto';
import { PrivateClassService } from '#/private-class/private-class.service';
import { PengajuanKelasDto } from './dto/pembayaran-pengajuan-kelas.dto';
import { Type } from 'class-transformer';
import { timeStamp } from 'console';
import { from, timestamp } from 'rxjs';
import { RegularClass } from '#/regular-class/entities/regular-class.entity';
@Injectable()
export class UsersPaymentService {
  constructor(
    @InjectRepository(UsersPayment)
    private usersPayRepo: Repository<UsersPayment>,
    @InjectRepository(RegularClass)
    private regClassRepo: Repository<RegularClass>,
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

  //users payment by type
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

  //users payment by status
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

  //list pengajuan kelas (pending)
  async findUsersPaymentPengajuan() {
    try {
      const data = await this.usersPayRepo.find({
        where: { type: type.CLASSPROP, status: statusPay.PENDING },
      });
      return data;
    } catch (e) {
      throw e;
    }
  }

  //list pembayaran trainee by trainee
  async findUsersPaymentByTrainee(id: string) {
    try {
      const trainee = await this.usersService.getUsersById(id);
      return await this.usersPayRepo.findAndCount({
        where: { users: { id: trainee.id } },
      });
    } catch (e) {
      throw e;
    }
  }

  //list pembayaran kitchen studio by kitchen studio
  async findUsersPaymentByKitchen(id: string) {
    const kitchen = await this.usersService.getUsersById(id);
    return await this.usersPayRepo.findAndCount({
      where: { users: { id: kitchen.id } },
    });
  }

  // list all pembayaran trainee & kitchen studio (by role)
  async findAllUsersPaymentTraineeKitchen(id: string) {
    try {
      const users = await this.usersService.findUserByRole(id);
      console.log(users, 'oi');
      const users2 = users.map((items) => items.id);
      console.log(users2, 'Halo');
      const result = await this.usersPayRepo.find({
        where:{users:{id: In(users2)}, status:statusPay.APPROVE},
        relations:{users: true, regular:true, privclass:true}
      })
      return result;
    } catch (e) {
      throw e;
    }
  }

  // async findd(id: string){
  //   try{
  //     const cari = await this.regularService.findById(id)
  //     console.log(cari.id, "ini id")
  //     console.log(cari.kitchen.users)
  //     return await this.usersPayRepo.find({
  //       where:{regular:{id:cari.id}}
  //     })
  //   }catch(e){
  //     throw e
  //   }
  // }
  async findAllUsersPaymentTraineeKitchen2(id: string){
    try {
      const users = await this.usersService.findUserByRole(id);
      console.log(users, 'oi');
      const users2 = users.map((items) => items.id);
      console.log(users2, 'Halo');
      const result = await this.usersPayRepo
        .createQueryBuilder('users_payment')
        .where('users_payment.users_id IN (:...usersIds)', { usersIds: users2 })
        .getManyAndCount();
      return result;
    } catch (e) {
      throw e;
    }
  }

  //list pembayaran trainee by kitchen studio
  async findPaymentTraineeByKitchen(idKitchen: string) {
    try {
      // const kitchen = await this.usersService.getUsersById(idKitchen)
      const cari = await this.regularService.findRegClassByUsersKitchen(
        idKitchen,
      );
      const cari2 = await this.privateService.findPrivClassByUsersKitchen(
        idKitchen,
      );

      const data1 = cari.map((regular) =>regular?.id ).filter((id) => id !== undefined);
      console.log(data1);
      const data2 = cari2.map((priv) => (priv?.id)).filter((id) => id !== undefined);
      console.log(data2);
      const result = await this.usersPayRepo.createQueryBuilder('users_payment')
      .leftJoinAndSelect('users_payment.regular', 'regular_class', 'users_payment.regular_id = regular_class.id ')
      .leftJoinAndSelect('users_payment.privclass', 'private_class', 'users_payment.privclass_id = private_class.id')
      .where('(users_payment.regular_id IN (:...regIds) OR users_payment.privclass_id IN (:...privIds))', {regIds: data1, privIds:data2})
      // .orWhere('users_payment.privclass_id IN (:...privIds)', {privIds:data2})
      .andWhere('users_payment.status = :status', {status:'approve'})
      .andWhere('users_payment.type IN (:...types)', {types:[type.REGCLASS, type.PRIVCLASS]})
      .getMany()
      return result;
    } catch (e) {
      throw e;
    }
  }

  //transaksi pengajuan kelas
  async bookingPengajuan(pembayaranPengajuanDto: PembayaranPengajuanDto) {
    try {
      // const bank = await this.bankService.getBankById(
      //   pembayaranPengajuanDto.bank,
      // );
      const users = await this.usersService.getUsersById(
        pembayaranPengajuanDto.users,
      );
      const regular = await this.regularService.findById(
        pembayaranPengajuanDto.regular,
      );
      const date = new Date();
      console.log(date.toLocaleString(), 'tanggal');
      const upload = new UsersPayment();
      // upload.bank = bank;
      upload.users = users;
      upload.regular = regular;
      upload.date = date;
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

  //booking kelas regular
  async bookingKelasTrainee(bookingKelasDto: BookingKelasDto) {
    try {
      const users = await this.usersService.getUsersById(bookingKelasDto.users);
      // const bank = await this.bankService.getBankById(bookingKelasDto.bank)
      // console.log(bank, "ini bank")
      const regular = await this.regularService.findById(
        bookingKelasDto.idclass,
      );
      let bangku;
      if (regular.numberOfBenches > 0) {
        bangku = { numberOfBenches: regular.numberOfBenches - 1 };
      }

      console.log(bangku, 'halo');
      await this.regClassRepo.update(regular.id, bangku);
      // console.log(regular, 'bangku');
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

  //booking kelas private
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

  async transaksiAdminToKitchen(id:string){
    try{
      const cari = await this.regularService.findRegClassByUsersKitchen(id);
      const cari2 = await this.privateService.findPrivClassByUsersKitchen(id);
    }catch(e){
      throw e
    }
  }
}
