import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Training_theme } from './entities/training_theme.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateTraining_themeDto } from './dto/create-training_theme.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTraining_themeDto } from './dto/update-training_theme.dto';
import { UsersService } from '#/users/users.service';

@Injectable()
export class TrainingThemeService {
    constructor(
        @InjectRepository(Training_theme)
        private training_themeRepository: Repository<Training_theme>,
        private usersService: UsersService
        
    ){}

    async create(createTraining_themeDto: CreateTraining_themeDto){
        try {
           const userKitchen = await this.usersService.getUsersById(createTraining_themeDto.kitchen)
           const training_theme = new Training_theme
           training_theme.name = createTraining_themeDto.name
           training_theme.chef_name = createTraining_themeDto.chef_name
           training_theme.price = createTraining_themeDto.price
           training_theme.kitchen = userKitchen

           const insertTraining_theme = await this.training_themeRepository.insert(training_theme)
           return await this.training_themeRepository.findOneOrFail({
            where: {
                id: insertTraining_theme.identifiers[0].id
            },
            relations:{kitchen: true}
           })
        } catch (e) {
            throw e
        }
    }

    findAll(){
        return this.training_themeRepository.findAndCount();
    }

    async findOneById(id: string){
        try {
            return await this.training_themeRepository.findOneOrFail({
                where: {id}
                // relations: {trainee: true} // untuk foreign key
        })

        } catch (e) {
            if (e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "Data Not Found",
                    },
                    HttpStatus.NOT_FOUND
                )
            } else {
                throw e
            }
        }
    }
    async findbyUsersId(id: string){
        try {
            return await this.training_themeRepository.find({
                where: {kitchen:{id:id}}
                // relations: {trainee: true} // untuk foreign key
        })

        } catch (e) {
            if (e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "Data Not Found",
                    },
                    HttpStatus.NOT_FOUND
                )
            } else {
                throw e
            }
        }
    }
    async update(id: string, updateTraining_themeDto:UpdateTraining_themeDto){
        try {
            // cari id
            await this.findOneById(id)

            // update data id
            const training_themeEntity = new Training_theme
            training_themeEntity.name = updateTraining_themeDto.name
            training_themeEntity.chef_name = updateTraining_themeDto.chef_name
            training_themeEntity.price = updateTraining_themeDto.price

            await this.training_themeRepository.update(id, training_themeEntity)

            //return data after updated
            return await this.training_themeRepository.findOneOrFail({
                where:{
                    id
                }
            })
        } catch (e) {
            throw e
        }
    }

    async softDeleteById(id: string){
        try {
            //cari id
            await this.findOneById(id)

            //delete id yang ditemukan
            await this.training_themeRepository.softDelete(id)

            return "success"
        } catch (e) {
            throw e
        }
    }
}
