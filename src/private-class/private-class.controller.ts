import { Controller, Post, Get, Put, Delete, HttpStatus, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { PrivateClassService } from './private-class.service';
import { createKitchenDto } from '#/kitchen_studio/dto/create_kitchen.dto';
import { CreatePrivateClassDto } from './dto/create-private-class.dto';
import { ApproveRejectPrivateDto } from './dto/approve-reject-private-class.dto';

@Controller('private-class')
export class PrivateClassController {
    constructor(
        private privateService: PrivateClassService
    ){}

    @Get()
    async getAllPrivate(){
        const [data, count] = await this.privateService.findAll()
        return {
            data,
            count,
            statusCode: HttpStatus.OK,
            message:"Success"
        }
    }

    @Post('/create')
    async createPrivate(@Body()createPrivateClassDto: CreatePrivateClassDto){
        const data = await this.privateService.create(createPrivateClassDto)
        return{
            data,
            statusCode: HttpStatus.CREATED,
            message: "Success"
        }
    }

    @Get('/find-kitchen/:id')
    async getPrivateByKitchen(@Param('id', ParseUUIDPipe)id: string){
        const data = await this.privateService.findPrivateByKitchen(id)
        return{
            data,
            statusCode: HttpStatus.OK,
            message:"Success"
        }
    }

    @Get('/find-trainee/:id')
    async getPrivateByTrainee(@Param('id', ParseUUIDPipe)id: string){
        const data = await this.privateService.findPrivateByTrainee(id)
        return{
            data,
            statusCode: HttpStatus.OK,
            message:"Success"
        }
    }
    
    @Get('/:id')
    async getPrivateById(@Param('id', ParseUUIDPipe) id: string){
        const data = await this.privateService.findDetailPrivate(id)
        return{
            data,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }
}
