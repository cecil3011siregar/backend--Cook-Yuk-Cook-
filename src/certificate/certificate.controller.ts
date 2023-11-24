import { Controller,
    HttpStatus,
    Post,
    Get,
    Body,
    Put,
    Param,
    ParseUUIDPipe,
    Delete
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';


@Controller('certificate')
export class CertificateController {
    constructor(private certificateService: CertificateService){}

    @Post()
    async create(@Body() createCertificateDto: CreateCertificateDto) {
        const data = await this.certificateService.create(createCertificateDto)

        return {
            data,
            statusCode: HttpStatusCode.Created,
            message: "Success"
        }
    }

    @Get()
    async getAll(){
        const [data, count] = await this.certificateService.getAll();

        return {
            data,
            count,
            statusCode: HttpStatusCode.Ok,
            message: "Success"
        }
    }

    @Get(":id")
    async getDetailById(@Param('id') id: string) {
        const data = await this.certificateService.getCertificateById(id);
    
        return {
            data,
            statusCode: HttpStatusCode.Ok,
            message: "Success"
        }
    }

    @Put("/:id")
    async update(@Param("id", ParseUUIDPipe) id: string, @Body() updateCertificateDto: UpdateCertificateDto) {
        const data = await this.certificateService.updateCertificate(id, updateCertificateDto)

        return {
            data,
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Delete(":id")
    async softDelete(@Param("id", ParseUUIDPipe) id: string){
        return {
            statusCode: HttpStatus.OK,
            message: await this.certificateService.deleteCertificate(id)

        }
    }

}
