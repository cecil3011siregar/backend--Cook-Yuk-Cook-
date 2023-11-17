import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelUsers } from './entities/level-users.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateLevelUsersDto } from './dto/create-level-users.dto';
import { UpdateLevelUsersDto } from './dto/update-level-users.dto';

@Injectable()
export class LevelUsersService {
    constructor(
        @InjectRepository(LevelUsers)
        private levelUsersRepo: Repository<LevelUsers>,
    ){}

    getAll(){
        return this.levelUsersRepo.findAndCount()
    }

    async createLevel(createLevelUsersDto : CreateLevelUsersDto){
        try{
            const levelUsersEntity = new LevelUsers
            levelUsersEntity.name = createLevelUsersDto.name

            const insertLevelU = await this.levelUsersRepo.insert(levelUsersEntity)

            return this.levelUsersRepo.findOneOrFail({
                where:{
                    id: insertLevelU.identifiers[0].id,
                },
            });
        }catch(e){
            throw e
        }
    }

    async getLevelById(id: string){
        try{
            return await this.levelUsersRepo.findOneOrFail({
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
            }else{
                throw e
            }
        }
    }

    async updateLevel(id: string, updateLevelUsersDto: UpdateLevelUsersDto){
        try{
            await this.getLevelById(id)

            const levelUsersEntity = new LevelUsers
            levelUsersEntity.name = updateLevelUsersDto.name

            await this.levelUsersRepo.update(id, levelUsersEntity)

            return await this.levelUsersRepo.findOneOrFail({
                where:{id}
            })
        }catch(e){
            throw e
        }
    }

    async deleteLevel(id: string){
        try{
            await this.getLevelById(id)

            await this.levelUsersRepo.softDelete(id)
            return "Success"
        }catch(e){
            throw e
        }
    }
}
