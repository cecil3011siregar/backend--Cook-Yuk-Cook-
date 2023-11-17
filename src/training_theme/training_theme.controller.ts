import { Body, Controller, 
    HttpStatus, 
    Post,
    Get,
    Put,
    Param,
    ParseUUIDPipe,
    Delete,
    
} from '@nestjs/common';
import { TrainingThemeService } from './training_theme.service';
import { CreateTraining_themeDto } from './dto/create-training_theme.dto';
import { HttpStatusCode } from 'axios';
import { UpdateTraining_themeDto } from './dto/update-training_theme.dto';

@Controller('training-theme')
export class TrainingThemeController {
    constructor(private readonly training_themeService: TrainingThemeService){}

    @Post()
    async create(@Body() createTraining_themeDto: CreateTraining_themeDto) {
        const data = await this.training_themeService.create(createTraining_themeDto)
        

        return {
                data,
                statusCode: HttpStatusCode.Created,
                message: "success"
            }
        }

    @Get(":id")
    async getDetailById(@Param('id') id: string){
        const data = await this.training_themeService.findOneById(id);

        return {
            data,
            statusCode: HttpStatusCode.Ok,
            message: "success"
        }
    }
    
    @Get()
    async getAll(){
        const [data, count] = await this.training_themeService.findAll();

        return {
            data, 
            count,
            statusCode: HttpStatusCode.Ok,
            message: "success"
        }
    }

    @Put("/:id")
    async update(@Param("id", ParseUUIDPipe) id: string, @Body() updateTraining_themeDto: UpdateTraining_themeDto){
        //ambil data
        const data = await this.training_themeService.update(id, updateTraining_themeDto)

        return {
            data,
            statusCode: HttpStatus.OK,
            message: "success"
        }
    }

    @Delete(":id")
    async softDelete(@Param("id", ParseUUIDPipe) id: string){
        return {
            statusCode: HttpStatus.OK,
            message: await this.training_themeService.softDeleteById(id)
        }
    }

}
