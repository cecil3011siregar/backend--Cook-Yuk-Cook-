import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from './entities/certificate.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Injectable()
export class CertificateService {
    constructor(
        @InjectRepository(Certificate)
        private certificateRepository: Repository<Certificate>
    ){}

    getAll(){
        return this.certificateRepository.findAndCount();
    }


    async getCertificateById(id: string) {
        try {
            return await this.certificateRepository.findOneOrFail({
                where: {id}
            })
        } catch (e) {
            if (e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "Data not Found"
                    },
                    HttpStatus.NOT_FOUND
                )
            } else {
                throw e
            }
        }
    }

    async create(createCertificateDto: CreateCertificateDto){
        try {
            const certificate = new  Certificate
            certificate.date = createCertificateDto.date

            const insertCertificate = await this.certificateRepository.insert(certificate)

            return await this.certificateRepository.findOneOrFail({
                where: {
                    id: insertCertificate.identifiers[0].id
                }
            })
        } catch (e) {
            throw e
        }
    }

    async updateCertificate(id: string, updateCertificateDto: UpdateCertificateDto){
        try {
            await this.getCertificateById(id)

            const certificateEntity = new Certificate
            certificateEntity.date = updateCertificateDto.date

            return await this.certificateRepository.findOneOrFail({
                where: {id}
            })
        } catch (e) {
            throw e            
        }
    }

    async deleteCertificate(id: string){
        try {
            await this.getCertificateById(id)
            await this.certificateRepository.softDelete(id)
            return "Success"
        } catch (e) {
            throw e
        }
    }



}
