import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users_cyc } from "#/users/entities/user.entity";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { Repository } from "typeorm";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(Users_cyc)
        private userRepo: Repository<Users_cyc>
    ){
        super({
            secretOrKey: 'TOPSECRET2023',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: any){
        try{
            //data id payload exist tidak di data user
            const user = this.userRepo.findOne({
                where:{id: payload.id},
                relations:{level: true}
            })

            if(!user){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.UNAUTHORIZED,
                        message: 'token is invalid'
                    },
                    HttpStatus.UNAUTHORIZED
                );
            }
            return user
        }catch(e){
            throw e
        }
    }
}