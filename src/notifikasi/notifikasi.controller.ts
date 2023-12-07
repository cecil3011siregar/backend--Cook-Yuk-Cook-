import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Delete
} from '@nestjs/common';
import { NotifikasiService } from './notifikasi.service';
import { CreateNotifikasiDto } from './dto/create-notifikasi.dto';
import { UpdateStatusNotifikasiDto } from './dto/update-status-notifikasi.dto';
import { UpdateMessageNotifikasiDto } from './dto/update-message-notifikasi.dto';
import { statusNotif } from './entities/notifikasi.entity';
import { DeleteResult } from 'typeorm';

@Controller('notifikasi')
export class NotifikasiController {
  constructor(private notifikasiService: NotifikasiService) {}

  @Get('')
  async getNotifUnread(@Query('status') status: string){
    console.log(status, "ini status")
    const data = await this.notifikasiService.findNotifUnread(status)
    return {
        data,
        statusCode: HttpStatus.OK,
        message: "Success"
    }
  }

  @Get('all')
  async getAllNotif() {
    const [data, count] = await this.notifikasiService.findAll();
    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }

  @Get('/:id')
  async getNotifById(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.notifikasiService.findNotifById(id),
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }

  @Post('/create-notif')
  async createNotifikasi(@Body() createNotifikasiDto: CreateNotifikasiDto) {
    const data = await this.notifikasiService.createNotifikasi(
      createNotifikasiDto,
    );
    return {
      data,
      statusCode: HttpStatus.CREATED,
      message: 'Success',
    };
  }

  @Put('/status-notif/:id')
  async updateStatusNotif(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusNotifikasiDto: UpdateStatusNotifikasiDto,
  ) {
    const data = await this.notifikasiService.updateStatusNotif(
      id,
      updateStatusNotifikasiDto,
    );
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }

  @Put('/notif-content/:id')
  async updateNotifContent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMessageNotifikasiDto: UpdateMessageNotifikasiDto,
  ) {
    const data = await this.notifikasiService.updateMessageNotif(
      id,
      updateMessageNotifikasiDto,
    );
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }

  

  @Delete("/delete/:id")
  async deleteNotifikasi(@Param('id', ParseUUIDPipe)id: string){
    return{
        statusCode: HttpStatus.OK,
        message: await this.notifikasiService.deleteNotif(id)
    }
  }
}
