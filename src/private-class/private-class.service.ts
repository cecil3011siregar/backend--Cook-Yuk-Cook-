import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateClass } from './entities/private-class.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreatePrivateClassDto } from './dto/create-private-class.dto';
import { UsersService } from '#/users/users.service';
import { KitchenStudioService } from '#/kitchen_studio/kitchen_studio.service';
import { TrainingThemeService } from '#/training_theme/training_theme.service';

@Injectable()
export class PrivateClassService {
    constructor(
        @InjectRepository(PrivateClass)
        private privateRepo: Repository<PrivateClass>,
        private usersService: UsersService,
        private kitchenService:KitchenStudioService,
        private themeService: TrainingThemeService
    ){}

    findAll(){
        return this.privateRepo.findAndCount()
    }

    async create(createPrivateClassDto:CreatePrivateClassDto){
        try{
            const themeId = await this.themeService.findOneById(createPrivateClassDto.theme)
            const kitchenId = await this.kitchenService.findById(createPrivateClassDto.kitchen)
            const traineeId = await this.usersService.getUsersById(createPrivateClassDto.trainee)

            const priv = new PrivateClass
            priv.startDate = createPrivateClassDto.startDate
            priv.endDate = createPrivateClassDto.endDate
            priv.theme = themeId
            priv.kitchen = kitchenId
            priv.trainee = traineeId

            const insertPriv = await this.privateRepo.insert(priv)
            const result = await this.privateRepo.findOneOrFail({
                where:{id:insertPriv.identifiers[0].id}
            })
            return result
        }catch(e){
            throw e
        }
    }

    async findPrivateByKitchen(id: string){
        try{
            const kitchen = await this.kitchenService.findById(id)
            return await this.privateRepo.findAndCount({
                where:{kitchen:{id:kitchen.id}}
            })
        }catch(e){
            throw e
        }
    }
}
