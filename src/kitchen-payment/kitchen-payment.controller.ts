import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { KitchenPaymentService } from './kitchen-payment.service';
import { TransaksiAdminToKitchenDto } from './dto/transaksi-admin-to-kitchen.dto';

@Controller('kitchen-payment')
export class KitchenPaymentController {
    constructor(
        private kitchenPaymentService: KitchenPaymentService
    ){}

    @Get()
    async getAllKitchenPayment(){
        const [data, count] = await this.kitchenPaymentService.findAll()
        return{
            data,
            count,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }
    @Post('cari')
    async cobaDulu(@Body()transaksiAdminToKitchen: TransaksiAdminToKitchenDto){
        const data = await this.kitchenPaymentService.transaksiAdminToKitchen(transaksiAdminToKitchen)
        return {
            data, 
            statusCode: HttpStatus.CREATED,
            message: "Success"
        }
    }
}
