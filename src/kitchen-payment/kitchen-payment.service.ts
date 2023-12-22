import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KitchenPayment, statusPayKitchen } from './entity/kitchen-payment.entity';
import { And, Between, In, Repository } from 'typeorm';
import { UsersPaymentService } from '#/users-payment/users-payment.service';
import { TransaksiAdminToKitchenDto } from './dto/transaksi-admin-to-kitchen.dto';
import {
  UsersPayment,
  statusPay,
  type,
} from '#/users-payment/entities/users-payment.entity';
import { start } from 'repl';
import { KitchenStudioService } from '#/kitchen_studio/kitchen_studio.service';
import { UsersService } from '#/users/users.service';
import { date } from 'joi';

@Injectable()
export class KitchenPaymentService {
  constructor(
    @InjectRepository(KitchenPayment)
    private kitchenPaymentRepo: Repository<KitchenPayment>,
    @InjectRepository(UsersPayment)
    private usersPayRepo: Repository<UsersPayment>,
    private userspaymentService: UsersPaymentService,
    private kitchenService: KitchenStudioService,
    private usersService: UsersService,
  ) {}

  findAll() {
    return this.kitchenPaymentRepo.findAndCount();
  }

  async findById(id: string) {
    try {
      return await this.kitchenPaymentRepo.findOneOrFail({
        where: { id },
      });
    } catch (e) {
      throw e;
    }
  }

  async transaksiAdminToKitchen(
    transaksiAdminToKitchen: TransaksiAdminToKitchenDto,
  ) {
    try {
        //ambil id kitchen
      const kitchen = await this.kitchenService.getKitchenStudioById(
        transaksiAdminToKitchen.kitchen,
      );
    //   console.log(kitchen.users.id, "halo");

      //ambil id admin
      const admin = await this.usersService.getUsersById(
        transaksiAdminToKitchen.admin,
      );
      //cari data pembayaran yang sudah approve dari trainee
      const cariKelas =
        await this.userspaymentService.findPaymentTraineeByKitchen(
          kitchen.users.id,
        );
    //   console.log(cariKelas)

      //ambil id regular dan private
      const idReg = cariKelas.map((items) => String(items?.regular?.id))
        console.log(idReg, "halo")
    //   console.log(carireg, "hai")
      const idPriv = cariKelas.map((items) => String(items?.privclass?.id))
    //   console.log(idPriv, idReg);
      
    
      //range tanggal pembayaran
      const startDate = new Date();
      console.log(startDate.toLocaleString());
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() - 30);
      console.log(endDate.toLocaleString());

      const cariData = await this.usersPayRepo.find({
            where: {
                status: statusPay.APPROVE,
                createdAt: Between(startDate, endDate),
                  regular:In ([...idReg]),
                  privclass: In([...idPriv]) 
              },
              relations: { regular: true, privclass: true },
      });

    //   console.log(cariData);

      //validasi data ada atau tidak?
      if (cariData.length === 0) {
        console.log('Tidak ada data yang ditemukan.');
      } else {
        const data = cariData.map((items) => Number(items.totalPayment));
        const data2 = data.reduce((a, b) => a + b, 0);
        console.log('Total Payment:', data2);
        console.log('Total Payment:', data2);
        const kitchenPay = new KitchenPayment();
        kitchenPay.kitchen = kitchen;
        kitchenPay.admin = admin;
        kitchenPay.date = new Date()
        kitchenPay.totalPayment = data2;
        kitchenPay.adminFee = transaksiAdminToKitchen.adminFee;
        const insert = await this.kitchenPaymentRepo.insert(kitchenPay);
        return await this.kitchenPaymentRepo.findOneOrFail({
          where:{id: insert.identifiers[0].id}
        });
      }
    } catch (e) {
      throw e;
    }
  }
}
