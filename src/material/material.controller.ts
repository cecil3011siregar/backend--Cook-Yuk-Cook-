import { Controller, Get, HttpStatus, Post, Body, Param,ParseUUIDPipe } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';

@Controller('material')
export class MaterialController {
    constructor(
        private materialService: MaterialService
    ){}

    @Get()
    async getAllMaterial(){
        const [data, count] = await this.materialService.findAll()
        return{
            data,
            count,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }
    @Post('/create-material')
    async createMaterial(@Body() createMaterialDto: CreateMaterialDto){
        const data = await this.materialService.createMaterial(createMaterialDto)
        return {
            data,
            statusCode:HttpStatus.CREATED,
            message: "Success"
        }
    }

    
}
