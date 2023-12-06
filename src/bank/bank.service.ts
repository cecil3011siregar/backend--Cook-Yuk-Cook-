import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { UsersService } from '#/users/users.service';

@Injectable()
export class BankService {
    constructor(
        @InjectRepository(Bank)
        private bankRepository: Repository<Bank>,
        private usersService: UsersService
        // untuk foreign key ditambah code di baris ini

    ){}
    

    getAll(){
        return this.bankRepository.findAndCount();
    }

    async getBankById(id: string){
        try {
            return await this.bankRepository.findOneOrFail({
                where: {id}

                // relations: {foreignkey: true}  // add else for foreign key (change foreignkey)
            })
        } catch (e) {
            if(e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "Data not found"
                    },
                    HttpStatus.NOT_FOUND
                )
            } else {
                throw e
            }
        }
    }

    async create(createBankDto: CreateBankDto){
        try {
            // untuk foreign key harus ditambah di baris ini
            const users = await this.usersService.getUsersById(createBankDto.id_users)
            const bank = new Bank
            bank.users = users
            bank.account_number = createBankDto.account_number
            bank.bank_name = createBankDto.bank_name
            bank.account_owner = createBankDto.account_owner

            const insertBank = await this.bankRepository.insert(bank)
            return await this.bankRepository.findOneOrFail({
                where: {
                    id: insertBank.identifiers[0].id
                }
            })
        } catch (e) {
            throw e
        }
    }

    async updateBank(id: string, updateBankDto: UpdateBankDto){
        try {
            await this.getBankById(id)

            const bankEntity = new Bank
            // bankEntity.id = updateBankDto.id
            bankEntity.account_number = updateBankDto.account_number
            bankEntity.bank_name = updateBankDto.bank_name
            bankEntity.account_owner = updateBankDto.account_owner

            await this.bankRepository.update(id, bankEntity)

            return await this.bankRepository.findOneOrFail({
                where:{id}
            })
        } catch (e) {
            throw e
        }
    }

    async deleteBank(id: string){
        try {
            await this.getBankById(id)
            await this.bankRepository.softDelete(id)
            return "Success"
        } catch (e) {
            throw e
        }
    }








}
