import { Controller, Get, HttpStatus, ParseUUIDPipe, Put, Delete, Param, Body, Post } from '@nestjs/common';
import { BankService } from './bank.service';
import { UpdateBankDto } from './dto/update-bank.dto';
import { CreateBankDto } from './dto/create-bank.dto';
import { HttpStatusCode } from 'axios';

@Controller('bank')
export class BankController {
    constructor(
        private readonly bankService: BankService
    ){}
    

    @Post()
    async createBank(@Body() createBankDto: CreateBankDto){
        const data = await this.bankService.create(createBankDto)

        return {
            data,
            statusCode: HttpStatusCode.Created,
            message: "success"
        }
    }

    @Get()
    async getAll(){
        const [data, count] = await this.bankService.getAll();
        return {
            data,
            count,
            statusCode: HttpStatus.OK,
            MESSAGE: "Success"
        }
    }

    @Get(':id')
    async getDetailBank(@Param('id', ParseUUIDPipe) id: string){
        return{
            data: await this.bankService.getBankById(id),
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Put('/:id')
    async updateBank(@Param('id', ParseUUIDPipe) id: string, @Body() updateBankDto: UpdateBankDto){
        const data = await this.bankService.updateBank(id, updateBankDto)
        return {
            data,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Delete('/:id')
    async deleteBank(@Param('id', ParseUUIDPipe) id: string){
        return {
            statusCode: HttpStatus.OK,
            message: await this.bankService.deleteBank(id)
        }
    }


}
