import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateClass } from './entities/private-class.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreatePrivateClassDto } from './dto/create-private-class.dto';
import { UsersService } from '#/users/users.service';
import { KitchenStudioService } from '#/kitchen_studio/kitchen_studio.service';
import { TrainingThemeService } from '#/training_theme/training_theme.service';
import { ApproveRejectPrivateDto } from './dto/approve-reject-private-class.dto';

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
            const kitchenId = await this.kitchenService.getKitchenStudioById(createPrivateClassDto.kitchen)
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
            const kitchen = await this.kitchenService.getKitchenStudioById(id)
            return await this.privateRepo.findAndCount({
                where:{kitchen:{id:kitchen.id}}
            })
        }catch(e){
            throw e
        }
    }

    async findPrivateByTrainee(id: string){
        try{
            const trainee = await this.usersService.getUsersById(id)
            return await this.privateRepo.findAndCount({
                where:{trainee:{id:trainee.id}}
            })
        }catch(e){
            throw e
        }
    }

    async findDetailPrivate(id: string){
        try{
            return await this.privateRepo.findOneOrFail({
                where:{id},
                relations:{
                    trainee: true,
                    kitchen:true,
                    theme: true
                }
            })
        }catch(e){
            if(e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "Data Not Found"
                    },
                    HttpStatus.NOT_FOUND
                )
            }
        }
    }
    async approveReject(id: string, approveRejectDto : ApproveRejectPrivateDto){
        try{
            await this.findDetailPrivate(id)
            const cekPrivate = new PrivateClass
            cekPrivate.status = approveRejectDto.status

            await this.privateRepo.update(id, cekPrivate)
            return await this.privateRepo.findOneOrFail({
                where:{id}
            })
        }catch(e){
            throw e
        }
    }
}
