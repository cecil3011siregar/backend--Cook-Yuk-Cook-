import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { KitchenStudio, statusKitchen } from './entities/kitchen_studio.entity';
import { UsersService } from '#/users/users.service';
import { createKitchenDto } from './dto/create_kitchen.dto';
import { create } from 'domain';
import { UpdateKitchenDto } from './dto/update_kitchen.dto';

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
                return await this.kitchenRepo.findOneOrFail({where: {id},
                relations:{users: true}})
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
        async findKitchenByUsers(id:string){
            try {
                return await this.kitchenRepo.findOneOrFail({
                    where:{users:{id:id}}
                })
            } catch (e) {
                if(e instanceof EntityNotFoundError){
                    throw new HttpException(
                        {
                            statusCode:HttpStatus.NOT_FOUND,
                            error:"Data Not Found"
                        },
                        HttpStatus.NOT_FOUND
                    )
                }
                throw e
            }
        }
        async getAllUserByStatus(){
            return await this.kitchenRepo.findAndCount({
                where: {
                    status: statusKitchen.AVAILABLE
                }
            })
        }
    
}
