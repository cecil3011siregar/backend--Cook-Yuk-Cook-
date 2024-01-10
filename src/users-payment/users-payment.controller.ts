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
  ParseUUIDPipe,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storagePayment } from './helpers/upload-payment-image';
import { join } from 'path';
import { of } from 'rxjs';
import { UsersPaymentService } from './users-payment.service';
import { PembayaranPengajuanDto } from './dto/update-pembayaran-pengajuan.dto';
import { BookingKelasDto } from './dto/booking-kelas.dto';
import { PengajuanKelasDto } from './dto/pembayaran-pengajuan-kelas.dto';
import { AuthGuard } from '@nestjs/passport';
import { statusPay } from './entities/users-payment.entity';
import { BayarDto } from './dto/bayar-regular.dto';
@Controller('users-payment')
export class UsersPaymentController {
  constructor(private usersPaymentService: UsersPaymentService) {}

  @Get('/pending/:id')
  async getRegClassPendingByTrainee(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.usersPaymentService.findRegClassTraineePending(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get('/approve/:id')
  async getRegApproveClassByTrainee(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.usersPaymentService.findRegClassTraineeApprove(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get('/regular/:id')
  async getUserPayByRegular(@Param('id', ParseUUIDPipe)id: string){
    return {
      data: await this.usersPaymentService.findUserPayByRegular(id),
      statusCode: HttpStatus.OK,
      message: "Success"
    }
  }

  @Put('/status/:id')
  async updateUsersPaymentByStatus(
    @Param('id', ParseUUIDPipe) id: string) {
    const data = await this.usersPaymentService.updateStatusToApprove(id);
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }

  @Get('/payment-pengajuan')
  async getPengajuanKelas() {
    const data = await this.usersPaymentService.findUsersPaymentPengajuan();
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }
  @Get('/type')
  async getUsersPaymentByType(@Query('inputType') inputType: string) {
    const data = await this.usersPaymentService.findByType(inputType);
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }
  @Get('status')
  async getusersPaymentByStatus(@Query('inputStatus') inputStatus: string) {
    const data = await this.usersPaymentService.findByStatus(inputStatus);
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }
  @Get('payment')
  async getAllUsersPayment() {
    const [data, count] = await this.usersPaymentService.findAll();
    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }

  @Get('/:id')
  async getUsersPaymentById(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.usersPaymentService.findById(id);
    return {
      data,
      statusCode: HttpStatus.OK,
      mesasge: 'Success',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/cari')
  async getCariUsersPaymentById(@Req() req) {
    const idKitchen = req.user.id;
    const data = await this.usersPaymentService.findPaymentTraineeByKitchen(
      idKitchen,
    );
    return {
      data,
      statusCode: HttpStatus.OK,
      mesasge: 'Success',
    };
  }

  @Get('/all/:id')
  async getblabla(@Param('id', ParseUUIDPipe) id: string) {
    const data =
      await this.usersPaymentService.findAllUsersPaymentTraineeKitchen(id);
    return {
      data,
      statusCode: HttpStatus.OK,
      mesasge: 'Success',
    };
  }

  @Get('/payment-trainee/:id')
  async getUsersPaymentBytrainee(@Param('id', ParseUUIDPipe) id: string) {
    const [data, count] =
      await this.usersPaymentService.findUsersPaymentByTrainee(id);
    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }

  @Get('/payment-kitchen/:id')
  async getUsersPaymentByKitchen(@Param('id', ParseUUIDPipe) id: string) {
    const [data, count] =
      await this.usersPaymentService.findUsersPaymentByKitchen(id);
    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }

  @Post('/pay')
  async pembayaranPengajuan(
    @Body() pembayaranPengajuanDto: PembayaranPengajuanDto,
  ) {
    const data = await this.usersPaymentService.bookingPengajuan(
      pembayaranPengajuanDto,
    );
    return {
      data,
      statusCode: HttpStatus.CREATED,
      message: 'Success',
    };
  }
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

  @Get('upload/:image/:type')
  getImage(
    @Param('type') type: string,
    @Param('image') imagePath: string,
    @Res() res: any,
  ) {
    return of(res.sendFile(join(process.cwd(), `upload/payment/${imagePath}`)));
  }

  @Post('booking-regular')
  async BookingRegular(@Body() bookingKelasDto: BookingKelasDto) {
    const data = await this.usersPaymentService.bookingKelasTrainee(
      bookingKelasDto,
    );
    return {
      data,
      statusCode: HttpStatus.CREATED,
      message: 'Success',
    };
  }

  @Post('booking-private')
  async bookingPrivate(@Body() bookingKelasDto: BookingKelasDto) {
    const data = await this.usersPaymentService.bookingPrivateTrainee(
      bookingKelasDto,
    );
    return {
      data,
      statusCode: HttpStatus.CREATED,
      message: 'Success',
    };
  }
}
