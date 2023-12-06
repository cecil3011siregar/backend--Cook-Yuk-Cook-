import { Injectable } from '@nestjs/common';
import { PembayaranPengajuanDto } from './dto/pembayaran-pengajuan.dto';
import { storagePayment } from './helpers/upload-payment-image';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPayment } from './entities/users-payment.entity';
import { Repository } from 'typeorm';
import { BankService } from '#/bank/bank.service';
import { RegularClassService } from '#/regular-class/regular-class.service';
import { UsersService } from '#/users/users.service';
@Injectable()
export class UsersPaymentService {
    constructor(
        @InjectRepository(UsersPayment)
        private usersPayRepo : Repository<UsersPayment>,
        private bankService: BankService,
        private regularService: RegularClassService,
        private usersService: UsersService
        
    ){}
    async uploadPembayaran(pembayaranPengajuanDto : PembayaranPengajuanDto){
        try{
            const bank = await this.bankService.getBankById(pembayaranPengajuanDto.bank)
            // const users = await this.usersService.getUsersById(pembayaranPengajuanDto.users)
            const regular = await this.regularService.findById(pembayaranPengajuanDto.regular)
            const upload = new UsersPayment
            upload.bank = bank
            // upload.users = users
            upload.regular = regular
            upload.date = pembayaranPengajuanDto.date
            upload.price  = pembayaranPengajuanDto.price
            upload. totalPayment = upload.price
            upload.type = pembayaranPengajuanDto.typePay
            upload.photoProof =pembayaranPengajuanDto.photoProof

            const coba = await this.usersPayRepo.insert(upload)
            console.log(coba)
            return this.usersPayRepo.findOneOrFail({
                where: { id: coba.identifiers[0].id },
              });
        }catch(e){
            throw e
        }
    }
}
