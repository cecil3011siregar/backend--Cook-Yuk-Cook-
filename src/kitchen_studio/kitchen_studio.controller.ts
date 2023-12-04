import { Controller, Get, HttpStatus, Param, ParseUUIDPipe, UploadedFile, UseInterceptors, Post } from '@nestjs/common';
import { KitchenStudioService } from './kitchen_studio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageProfile } from './helpers/upload_profile';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Controller('kitchen-studio')
export class KitchenStudioController {
    constructor(
        private kitchenStudioService: KitchenStudioService,
    ){}



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


    @Get('/all')
    async getAllKitchenStudio(){
        const [data, count] = await this.kitchenStudioService.getAll();

        return {
            data,
            count,
            StatusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Get('/:id')
    async getDetailKitchenStudio(@Param('id', ParseUUIDPipe) id: string){
        return {
            data: await this.kitchenStudioService.getKitchenStudioById(id),
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Get()
    async getAllByActive(){
        const [data, count] =  await this.kitchenStudioService.getAllUserByStatus()
        return {
            data,
            count,
            statusCode: HttpStatus.OK,
            message: 'Success'
        }
    }


}
