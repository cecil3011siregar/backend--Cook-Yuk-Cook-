import { Controller, Get, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { KitchenStudioService } from './kitchen_studio.service';


@Controller('kitchen-studio')
export class KitchenStudioController {
    constructor(
        private kitchenStudioService: KitchenStudioService,
    ){}


    @Get()
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


}
