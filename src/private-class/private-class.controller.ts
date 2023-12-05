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

    
}
