import { Controller, Get, HttpStatus, Post, Body, Param, Put, ParseUUIDPipe, Delete } from '@nestjs/common';
import { KitchenStudioService } from './kitchen_studio.service';
import { createKitchenDto } from './dto/create_kitchen.dto';
import { UpdateKitchenDto } from './dto/update_kitchen.dto';

@Controller('kitchen-studio')
export class KitchenStudioController {
    constructor(
        private kitchenService: KitchenStudioService
    ){}

    @Get()
    async getAllKitchen(){
        const [data, count] = await this.kitchenService.findAll()
        return {
            data,
            count,
            statusCode:HttpStatus.OK,
            message: "Success"
        }
    }
    @Post('/add')
    async createKitchen(@Body() createKitchenDto: createKitchenDto){
        const data = await this.kitchenService.create(createKitchenDto)
        return {
            data,
            statusCode: HttpStatus.CREATED,
            message: "Success"
        }
    }
    
    @Get('/:id')
    async getKitchenById(@Param('id', ParseUUIDPipe) id: string){
        const data = await this.kitchenService.findById(id)
        return {
            data,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Put('/update/:id')
    async updateKitchen(@Param('id', ParseUUIDPipe) id: string, @Body() updateKitchenDto: UpdateKitchenDto){
        const data = await this.kitchenService.update(id, updateKitchenDto)
        return {
            data,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Delete('/del/:id')
    async deleteKitchen(@Param('id', ParseUUIDPipe) id: string){
        return {
            statusCode: HttpStatus.OK,
            message: await this.kitchenService.delete(id)
        }
    }

}
