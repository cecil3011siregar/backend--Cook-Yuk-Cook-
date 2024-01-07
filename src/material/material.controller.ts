import { Controller, Get, HttpStatus, Post, Body, Param,ParseUUIDPipe, Put, Delete } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
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
    @Get('/:id')
    async getMaterial2(@Param('id',ParseUUIDPipe)id: string){
        const data = await this.materialService.findMaterialById(id)
        // console.log(data, "halo")
        return {
            data,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Get('/list/:id')
    async getMaterial(@Param('id',ParseUUIDPipe)id: string){
        const data = await this.materialService.findMaterialByClass(id)
        // console.log(data, "halo")
        return {
            data,
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

    @Put('/update-material/:id')
    async updateMaterial(@Param('id', ParseUUIDPipe)id: string, @Body()updateMaterialDto: UpdateMaterialDto){
        const data = await this.materialService.updateMaterial(id, updateMaterialDto)
        return {
            data,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Delete('/del/:id')
    async deleteMaterial(@Param('id', ParseUUIDPipe) id: string){
        return {
            statusCode: HttpStatus.OK,
            message: await this.materialService.deleteMaterial(id)
        }
    }
}
