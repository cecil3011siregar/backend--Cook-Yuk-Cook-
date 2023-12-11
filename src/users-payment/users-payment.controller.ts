import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Query,
  Param,
  Get,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storagePayment } from './helpers/upload-payment-image';
import { join } from 'path';
import { of } from 'rxjs';
import { UsersPaymentService } from './users-payment.service';
import { PembayaranPengajuanDto } from './dto/pembayaran-pengajuan.dto';
import { BookingRegularDto } from './dto/booking-regular.dto';

@Controller('users-payment')
export class UsersPaymentController {
    constructor(
        private usersPaymentService : UsersPaymentService
    ){}
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', storagePayment))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (typeof file?.filename == 'undefined') {
        return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'error file cannot be upload',
        };
        } else {
        return { fileName: file?.filename };
        }
    }

    @Post('/pay')
    async pembayaranPengajuan(@Body()pembayaranPengajuanDto: PembayaranPengajuanDto){
        const data = await this.usersPaymentService.uploadPembayaran(pembayaranPengajuanDto)
        return{
            data,
            statusCode: HttpStatus.CREATED,
            message: "Success"
        }
    }

    @Get('upload/:image/:type')
    getImage(
        @Param('type') type: string,
        @Param('image') imagePath: string,
        @Res() res: any,
    ) {
        return of(res.sendFile(join(process.cwd(), `upload/payment/${imagePath}`)));
    }

    @Post('booking-regular')
    async BookingRegular(@Body()bookingRegularDto: BookingRegularDto){
        const data = await this.usersPaymentService.bookingRegular(bookingRegularDto)
        return{
            data,
            statusCode: HttpStatus.CREATED,
            message:"Success"
        }
    }
}