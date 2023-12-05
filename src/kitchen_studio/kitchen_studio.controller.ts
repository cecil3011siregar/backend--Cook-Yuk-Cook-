import { Controller, Get, HttpStatus, Post, Body, Param, Put, ParseUUIDPipe, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { KitchenStudioService } from './kitchen_studio.service';
import { createKitchenDto } from './dto/create_kitchen.dto';
import { UpdateKitchenDto } from './dto/update_kitchen.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageProfile } from './helpers/upload_profile';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Controller('kitchen-studio')
export class KitchenStudioController {
    constructor(
        private kitchenService: KitchenStudioService
    ){}

    @Get()
    async getAllKitchen(){
        const [data, count] = await this.kitchenService.getAll()
        return {
            data,
            count,
            statusCode:HttpStatus.OK,
            message: "Success"
        }
    }
    
    @Get('/:id')
    async getKitchenById(@Param('id', ParseUUIDPipe) id: string){
        const data = await this.kitchenService.getKitchenStudioById(id)
        return {
            data,
        }
        }
    @Post('/upload')
        @UseInterceptors(FileInterceptor('file', storageProfile))
        uploadFile(@UploadedFile() file: Express.Multer.File) {
            if (typeof file?.filename == "undefined"){
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: "error file cannot be uploaded"
                }
            } else {
                return {fileName: file?.filename}
            }
        }

    @Get()
    async getAllByActive(){
        const [data, count] =  await this.kitchenService.getAllUserByStatus()
        return {
            data,
            count,
            statusCode: HttpStatus.OK,
            message: 'Success'
        }
    }


}