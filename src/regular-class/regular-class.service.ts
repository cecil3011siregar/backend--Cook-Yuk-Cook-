import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegularClass } from './entities/regular-class.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { KitchenStudioService } from '#/kitchen_studio/kitchen_studio.service';
import { TrainingThemeService } from '#/training_theme/training_theme.service';

@Injectable()
export class RegularClassService {
    constructor(
        @InjectRepository(RegularClass)
        private regClassRepo: Repository<RegularClass>,
    ){}

    getAll(){
        return this.regClassRepo.findAndCount()
    }
    
    async findById(id: string){
        try{
            return await this.regClassRepo.findOneOrFail({
                where:{id}
            })
        }catch(e){
            if(e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "data not found"
                    },
                    HttpStatus.NOT_FOUND
                )
            }
        }
    }
}
