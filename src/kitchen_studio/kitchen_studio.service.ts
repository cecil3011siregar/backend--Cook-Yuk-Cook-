import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { KitchenStudio } from './entities/kitchen_studio.entity';
import { UsersService } from '#/users/users.service';
import { createKitchenDto } from './dto/create_kitchen.dto';
import { create } from 'domain';
import { UpdateKitchenDto } from './dto/update_kitchen.dto';

@Injectable()
export class KitchenStudioService {
    constructor(
        @InjectRepository(KitchenStudio)
        private kitchenRepo: Repository<KitchenStudio>,
        private userService: UsersService
    ){}

    findAll(){
        return this.kitchenRepo.findAndCount()
    }

    async findById(id: string){
        try{
            return await this.kitchenRepo.findOneOrFail({
                where:{id},
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
    async create(createKitchenDto: createKitchenDto){
        try{
            const userId = await this.userService.getUsersById(createKitchenDto.users_id)
            const kitchenEntity = new KitchenStudio
            kitchenEntity.users = userId
            kitchenEntity.legality = createKitchenDto.legality
            kitchenEntity.numberOfChefs = createKitchenDto.numberOfChefs
            kitchenEntity.chefOnWork = createKitchenDto.chefOnWork
            kitchenEntity.chefOnAvailable = createKitchenDto.chefOnAvailable
            kitchenEntity.logos = createKitchenDto.logos
            kitchenEntity.description = createKitchenDto.description

            const insertKitchen = await this.kitchenRepo.insert(kitchenEntity)
            const result= await this.kitchenRepo.findOneOrFail({
                where:{id: insertKitchen.identifiers[0].id},
                relations:{users:true}
            })
            return result

        }catch(e){
            throw e
        }
    }

    async update(id: string, updateKitchenDto: UpdateKitchenDto){
        try{
            await this.findById(id)
    
            const kitchenEntity = new KitchenStudio
            kitchenEntity.legality = updateKitchenDto.legality
            kitchenEntity.numberOfChefs = updateKitchenDto.numberOfChefs
            kitchenEntity.chefOnWork = updateKitchenDto.chefOnWork
            kitchenEntity.chefOnAvailable = updateKitchenDto.chefOnAvailable
            kitchenEntity.logos = updateKitchenDto.logos
            kitchenEntity.description = updateKitchenDto.description
    
            await this.kitchenRepo.update(id, kitchenEntity)
    
            return await this.kitchenRepo.findOneOrFail({
                where:{id}
            })
        }catch(e){
            throw e
        }
    }
    async delete(id: string){
        try{
            await this.findById(id)
            await this.kitchenRepo.softDelete(id)
            return "Success"
        }catch(e){
            throw e
        }
    }

}
