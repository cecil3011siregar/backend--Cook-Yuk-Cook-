import { Controller, Get, HttpStatus, Post, Put, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { RegularClassService } from './regular-class.service';

@Controller('regular-class')
export class RegularClassController {
    constructor(
        private regularClassService : RegularClassService
    ){}

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
}
