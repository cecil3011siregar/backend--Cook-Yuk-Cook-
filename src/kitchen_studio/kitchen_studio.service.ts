import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KitchenStudio } from './entities/kitchen_studio.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class KitchenStudioService {
    constructor(
        @InjectRepository(KitchenStudio)
        private kitchenRepo: Repository<KitchenStudio>
    ){}


        getAll(){
            return this.kitchenRepo.findAndCount()
        }

        async getKitchenStudioById(id: string){
            try {
                return await this.kitchenRepo.findOneOrFail({where: {id}})
            } catch (e) {
                if (e instanceof EntityNotFoundError){
                    throw new HttpException(
                        {
                            statusCode: HttpStatus.NOT_FOUND,
                            error: "Data not Found"
                        },
                        HttpStatus.NOT_FOUND
                    )
                }
            }
        }

}
