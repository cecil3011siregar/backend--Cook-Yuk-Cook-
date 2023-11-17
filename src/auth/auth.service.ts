import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUsersDto } from './dto/register-users.dto';
import { Users_cyc } from '#/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { LevelUsersService } from '#/level-users/level-users.service';
import { LoginUsersDto } from './dto/login-users.dto';
import { UsersService } from '#/users/users.service';
import * as bcrypt from'bcrypt';
import { JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users_cyc)
        private usersRepo: Repository<Users_cyc>,
        private levelUsersService: LevelUsersService,
        private jwtService: JwtService
    ){}
    async register(registerUserDto: RegisterUsersDto){
        try{
            console.log("sebelum")
            const findLevelUsersId = await this.levelUsersService.getLevelById(registerUserDto.level_id)
            console.log("setelah")
            //generate salt
            const saltGenerate = await bcrypt.genSalt()
            //hash password
            const password = registerUserDto.password
            const hash = await bcrypt.hash(password, saltGenerate)

            const usersEntity = new Users_cyc
            usersEntity.name = registerUserDto.name
            usersEntity.email = registerUserDto.email
            usersEntity.salt =saltGenerate
            usersEntity.password = hash
            usersEntity.dateOfBirth = new Date(registerUserDto.dateOfBirth)
            usersEntity.gender = registerUserDto.gender
            usersEntity.phoneNumber = registerUserDto.phoneNumber
            usersEntity.photo = registerUserDto.photo
            usersEntity.address = registerUserDto.address
            // usersEntity.status = registerUserDto.status
            usersEntity.level = findLevelUsersId

            const insertUsers = await this.usersRepo.insert(usersEntity)
            const result= await this.usersRepo.findOneOrFail({
                where:{id: insertUsers.identifiers[0].id}
            })
            return result
        }catch(e){
        throw e
        }
    }

    async login(loginUsersDto: LoginUsersDto){
        try{
            // cari data user by email
        const emailOne = await this.usersRepo.findOne({
            where:{email:loginUsersDto.email}
        })

        if(!emailOne){
            throw new HttpException(
                {
                statusCode: HttpStatus.BAD_REQUEST,
                error: 'username is invalid'
                },
                HttpStatus.BAD_REQUEST
            );
        }

        // password dari data user sama dengan loginUsersDto.password tidak?
        const passwordSama = await bcrypt.compare(loginUsersDto.password, emailOne.password)

        if(!passwordSama){
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: 'password is invalid'
                },
                HttpStatus.BAD_REQUEST
            );
        }

        const payload = {
            id: emailOne.id,
            name: emailOne.name,
            email: emailOne.email
        }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
        }catch(e){
            throw e
        }
        
    }
}
