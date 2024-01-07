import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users_cyc, statusUser } from '#/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { LevelUsersService } from '#/level-users/level-users.service';
import { LoginUsersDto } from './dto/login-users.dto';
import { UsersService } from '#/users/users.service';
import * as bcrypt from'bcrypt';
import { JwtService} from '@nestjs/jwt'
import { KitchenStudio } from '#/kitchen_studio/entities/kitchen_studio.entity';
import { RegisterDto } from './dto/register.dto';
import { registerSchema } from 'class-validator';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users_cyc)
        private usersRepo: Repository<Users_cyc>,
        @InjectRepository(KitchenStudio)
        private kitchenRepo: Repository<KitchenStudio>,
        private levelUsersService: LevelUsersService,
        private jwtService: JwtService
    ){}
    
      async register(registerKDto: RegisterDto) { 
        try{
            if(!["Trainee", "Kitchen Studio"].includes(registerKDto.level)){
                throw new BadRequestException('Role tidak ditemukan')
            }
            let cariLevel:any = await this.levelUsersService.getName(registerKDto.level)
            console.log(cariLevel)
            let levelId: any = cariLevel.id
            console.log(levelId)
            let status: any
            if(registerKDto.level === "Kitchen Studio"){
                status = 'pending'
            }else if(registerKDto.level === "Trainee"){
                status = 'active'
            }
            //generate salt
            const saltGenerate = await bcrypt.genSalt()
            //hash password
            const password = registerKDto.password
            const hash = await bcrypt.hash(password, saltGenerate)
            // const cariid = await this.levelUsersService.getLevelById(registerKDto.level_id)
            const users = new Users_cyc()
            users.level = levelId
            users.name = registerKDto.name
            users.email = registerKDto.email
            users.password = hash
            users.salt =saltGenerate
            users.dateOfBirth = registerKDto.dateOfBirth
            users.gender = registerKDto.gender
            users.photo = registerKDto.photo
            users.phoneNumber = registerKDto.phoneNumber
            users.address = registerKDto.address
            users.status = status

            const insertUsers = await this.usersRepo.insert(users)
    
            const kitchen = new KitchenStudio()
            kitchen.legality = registerKDto?.legality
            kitchen.numberOfChefs = registerKDto?.numberOfChefs
            kitchen.chefOnWork = registerKDto?.chefOnWork
            kitchen.chefOnAvailable = registerKDto?.chefOnAvailable
            kitchen.logos = registerKDto?.logos
            kitchen.description = registerKDto?.description
            kitchen.users = insertUsers.identifiers[0].id
            let insertKitchen
            if(registerKDto.level === "Kitchen Studio"){
                 insertKitchen = await this.kitchenRepo.insert(kitchen)

            }
            if(insertKitchen){
                return (
                    this.usersRepo.findOneOrFail({
                        where:{id: insertUsers.identifiers[0].id}
                    }),
                    this.kitchenRepo.findOneOrFail({
                        where:{id: insertKitchen.identifiers[0].id}
                    })
                )
            }else{
                return this.usersRepo.findOneOrFail({
                    where:{id: insertUsers.identifiers[0].id}
                })
            }
            
        }catch(e){
            throw e
        }
      }
    async login(loginUsersDto: LoginUsersDto){
        try{
            // cari data user by email
        const emailOne = await this.usersRepo.findOne({
            where:{email:loginUsersDto.email},
            relations:{level: true}
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
            email: emailOne.email,
            role: emailOne.level.name
        }
        return {
            // payload
            access_token: await this.jwtService.signAsync(payload)
        }
        }catch(e){
            throw e
        }
        
    }
}
