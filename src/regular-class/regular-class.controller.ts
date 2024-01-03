import { Controller, Get, HttpStatus, Post, Put, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { RegularClassService } from './regular-class.service';
import { CreateReadStreamOptions } from 'fs/promises';
import { CreateRegClassDto } from './dto/create-regular-class.dto';
import { UpdateRegClassDto } from './dto/update-regular-class.dto';
import { ApproveRejectRegularDto } from './dto/approve-reject-regular.dto';
import { JumlahBenchesDto } from './dto/update-jumlah-benches.dto';

@Controller('regular-class')
export class RegularClassController {
    constructor(
        private regularClassService : RegularClassService
    ){}
    
    @Get('/find/:id')
    async getRegClassByRole(@Param('id', ParseUUIDPipe) id: string){
        return {
            data : await this.regularClassService.findRegClassByUsersKitchenPending(id),
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Get()
    async getAllRegular(){
        const [data, count] = await this.regularClassService.getAll()
        return {
            data,
            
            count,
            StatusCode: HttpStatus.OK,
            message:"Success"
        }
    }

    @Get('/:id')
    async getRegularById(@Param('id', ParseUUIDPipe)id: string){
        const data = await this.regularClassService.findById(id)
        return{
            data,
            statusCode: HttpStatus.OK,
            message:"Success"
        }
    }

    @Post('/create-pengajuan')
    async createPengajuan(@Body() createRegClassDto: CreateRegClassDto){
        const data = await this.regularClassService.createPengajuan(createRegClassDto)
        return{
            data,
            StatusCode: HttpStatus.CREATED,
            message: "Success"
        }
    }

    @Put('/approve/:id')
    async approve (@Param('id', ParseUUIDPipe)id: string){
        const data = await this.regularClassService.approveRegular(id)
        return {
            data,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Put('/reject/:id')
    async reject (@Param('id', ParseUUIDPipe)id: string, @Body()approveRejectRegularDto: ApproveRejectRegularDto){
        const data = await this.regularClassService.rejectRegular(id, approveRejectRegularDto)
        return {
            data,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Put('/update-pengajuan/:id')
    async updatePengajuan(@Param('id', ParseUUIDPipe) id: string, @Body()updateRegClassDto:UpdateRegClassDto){
        const data = await this.regularClassService.updatePengajuan(id, updateRegClassDto)
        return {
            data,
            statusCode:HttpStatus.OK,
            message:"Success"
        }
    }

    @Get('/find-pending/:id')
    async getRegClassByRolePending(@Param('id', ParseUUIDPipe) id: string){
        return {
            data : await this.regularClassService.findRegClassByUsersKitchenPending(id),
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }
    @Put('benches/:id')
    async updateJumlahBenches(@Param('id', ParseUUIDPipe)id: string, @Body()updateJumlahBenchesDto: JumlahBenchesDto){
        const data = await this.regularClassService.updateJumlahBenches(id, updateJumlahBenchesDto)
        return {
            data, 
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

}
